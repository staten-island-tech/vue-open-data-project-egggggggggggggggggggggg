<template>
  <div id="map" style="height:500px; width:100%"></div>
  <form>
    <select value="arrest_key">Arrest ID</select>
    <select value="=arrest_data">Date</select>
    <select></select>
  </form>
</template>



<script setup>
  import { onMounted, ref } from 'vue';
  import { delay } from './utils';
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  const offenses = {}
  const counter = {M:0,F:0}
  const commonData =  {
    "arrest_date": "2024-01-01T00:00:00.000",
    "pd_cd": "792",
    "pd_desc": "CRIMINAL POSSESSION WEAPON",
    "ky_cd": "118",
    "ofns_desc": "DANGEROUS WEAPONS",
    "law_cat_cd": {},
    "arrest_boro": {},
    "arrest_precinct": {},
    "jurisdiction_code": {},
    "age_group": {},
    "perp_sex": {},
    "perp_race": {}
  }//data to check
  //parse data for the stuff using Object.value() and Object.keys()
  //example
  //export const data = {
  //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  //   datasets: [
  //     {
  //       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
  //       data: [40, 20, 80, 10]
  //     }
  //   ]
  // }





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
  function commonDataCondense(dataKey , dataVal) //anything without a comma=valide
  {
    if(!commonData[dataKey][dataVal])
    {
      commonData[dataKey][dataVal]=1;
      return;
    }
    commonData[dataKey][dataVal] +=1;
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
    console.log(counter)
  }



  onMounted(()=>
  {
    getData();
    const map = L.map("map").setView([40.792195123000056, -73.93819514199998], 12); // NYC coords
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    L.marker([40.792195123000056, -73.93819514199998])
      .addTo(map)
      .bindPopup("Hello, NYC!")
      .openPopup();
  })




  function queryDBLink(searchParams)//obj containing SOQL method and the value or smth
  {
    let baseURL = `https://data.cityofnewyork.us/resource/uip8-fykc.json?`
    for(const [key, value] of Object.entries(searchParams))
    {
      baseURL+=`$${key}=${value}&`
    }
    return baseURL;
  }
</script>

<style scoped>

</style>