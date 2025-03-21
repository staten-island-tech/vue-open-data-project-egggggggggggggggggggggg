import { queryDBLink } from "./utils";


const offenses = {}
const commonData =  {
    "arrest_date": {},
    "pd_desc": "CRIMINAL POSSESSION WEAPON",
    "ofns_desc": "DANGEROUS WEAPONS",
    "law_cat_cd": {},
    "arrest_boro": {},
    "arrest_precinct": {},
    "jurisdiction_code": {},
    "age_group": {},
    "perp_sex": {},
    "perp_race": {},
    "arrest_key": {},
    "arrest_date":{},
    "pd_cd":{},
    "pd_desc":{},
    "ky_cd":{},
    "ofns_desc":{},
    "law_code":{},
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
    }
    let dataVal = dv.toString();
    if(dataKey=="arrest_date")
    {
      dataVal = dataVal.split('T')[0].split('-');
      console.log(dataVal)
      const year = `Year: ${dataVal[0]}`;
      const month =  `Month: ${dataVal[1]}`;
      const day =  `Day: ${dataVal[2]}`;
      commonData[dataKey][year] = (commonData[dataKey][year] || 0) + 1;
      commonData[dataKey][month] = (commonData[dataKey][month] || 0) + 1;
      commonData[dataKey][day] = (commonData[dataKey][day] || 0) + 1;
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
    console.log(dbLength)
    const newLink = queryDBLink(
      {
        limit:100,
      }
    )
    const newData =  await fetchData(newLink);
    newData.forEach(item=>
      {
        for(const [key,value] of Object.entries(item))
        {
          commonDataCondense(key, value)
        }
      }
    )
    console.log(`Took : ${Math.floor(performance.now()-start)}`);
    console.log(commonData,offenses)
  }
  async function test()
  {
    await getData();
    changeData("arrest_boro");
    if(!loadDoughnut){return}
    
    testKey.value+=1;
  }
