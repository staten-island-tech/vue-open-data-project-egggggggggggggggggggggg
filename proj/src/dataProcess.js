import { parse } from "vue/compiler-sfc";
import { queryDBLink } from "./utils";


const offenses = {}
const commonData =  {
    "arrest_date": {
      "01":{},
      "02":{},
      "03":{},
      "04":{},
      "05":{},
      "06":{},
      "07":{},
      "08":{},
      "09":{},
      "10":{},
      "11":{},
      "12":{},

    },
    "ofns_desc": "DANGEROUS WEAPONS",
    "law_cat_cd": {},
    "arrest_boro": {},
    "age_group": {},
    "perp_sex": {},
    "perp_race": {},
    "arrest_date":{},
    "ofns_desc":{},
    "coordinates":[]
  }
  function commonDataCondense(dk , dv)
  {
    const dataKey = dk.toString();
    if(!commonData[dataKey])
    {
      return
    }
    let dataVal = dv.toString();
    if(dataKey=="arrest_date")
    {
      dataVal = dataVal.split('T')[0].split('-');
      const year = `Year: ${dataVal[0]}`;
      const month =  `${dataVal[1]}`;
      const day =  `${dataVal[2]}`;
      if(!commonData[dataKey][month])
      {
        commonData[dataKey][month] = {};
      }
      commonData[dataKey][month][day] = (commonData[dataKey][month][day] || 0) + 1;
      return;
    }
    commonData[dataKey][dataVal] = (commonData[dataKey][dataVal] || 0) + 1;
  }
  async function fetchData(url)
  {
    const newLink = await fetch(url);
    const jData =  await newLink.json();
    return jData;
  }

  async function getData()
  {
    const start =  performance.now();
    const dbLength = Number((await fetchData("https://data.cityofnewyork.us/resource/uip8-fykc.json?$select=count(*)"))[0].count);
    const newLink = queryDBLink(
      {
        limit:dbLength,
      }
    )
    const heatMapData= new Map();
    const newData =  await fetchData(newLink);
    console.log("Took", performance.now()-start,"ms to fetch Data")
    newData.forEach(item=>
      {
        const long = parseFloat(parseFloat(item.longitude).toFixed(4));
        const lat = parseFloat(parseFloat(item.latitude).toFixed(4));
        if (lat !== null && long !== null && lat !== 0 && long !== 0 && !isNaN(lat) && !isNaN(long))
        {
          const coordinates = [long,lat];
          commonData.coordinates.push(coordinates);
        }
        for(const [key,value] of Object.entries(item))
        {
          commonDataCondense(key, value)       
        }
      }
    )
    console.log(`Took : ${Math.floor(performance.now()-start)} ms to process data`);
  }
export { commonData, getData }