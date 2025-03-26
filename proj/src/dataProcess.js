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
    "pd_desc": "CRIMINAL POSSESSION WEAPON",
    "ofns_desc": "DANGEROUS WEAPONS",
    "law_cat_cd": {},
    "arrest_boro": {},
    "age_group": {},
    "perp_sex": {},
    "perp_race": {},
    "arrest_date":{},
    "pd_desc":{},
    "ofns_desc":{},
    "coordinates":[]
  }//data to check
  function parseCrimes(pd_desc)
  {
    pd_desc.split(",").forEach(
      crime=>
      {
        if(!offenses[crime])
        {
          offenses[crime] = 1;
          return;
        }
        else
        {
          offenses[crime] += 1;
        }
      }
    )
  }
  function commonDataCondense(dk , dv) //anything without a comma=valide
  {
    const dataKey = dk.toString();
    if(!commonData[dataKey])
    {
      return
    }
    if(dataKey=="pd_desc")
    {
      parseCrimes(dv);
      return;
    }//FIX THE DATES
    let dataVal = dv.toString();
    if(dataKey=="longitude"||dataKey=="latitude")
    {
      return
    }
    if(dataKey=="arrest_date")//no counte for crime in yr, add add
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
    if(dataKey=="arrest_key"){return}
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
    )//for th heatmap just trim precision here
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
          if(key!="longitude"||key!="latitude")
          {
            commonDataCondense(key, value)
          }        
        }
      }
    )
    console.log(`Took : ${Math.floor(performance.now()-start)} ms to process data`);
  }
  //for something like coordinates for the heat map trim down hte precision to smwhere around 3 or 2 decimals

  //based on user selected category either use the initially loaded data whichj is slow to fetch or use $select to speed up calls to tyhe
  async function test()
  {
    await getData();
  }

export { commonData, getData }