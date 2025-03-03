<template>
  <div id="map" style="height:500px; width:100%"></div>
  <form>
    <select value="arrest_key">Arrest ID</select>
    <select value="=arrest_data">Date</select>
    <select></select>
  </form>
  <Doughnut :data="data"></Doughnut>
</template>



<script setup>
  import { onMounted, ref } from 'vue';
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { Doughnut } from 'vue-chartjs';
  const testlink =  `https://data.cityofnewyork.us/resource/uip8-fykc.json?$select=perp_sex&$order=arrest_key`
  let Mcounter= 0;
  let Fcounter= 0;
  async function test()
  {
    let entries = 0;
    let start=performance.now()
    while(true)
    {
      const newLink = queryDBLink({
        offset:entries,
        order:"arrest_key",
      })
      const fData =  await fetch(newLink);
      const jData = await fData.json();
      if(jData.length==0)
      {
        break
      }
      jData.forEach(item=>
      {
        if(item.perp_sex=="M")
        {
          Mcounter+=1; 
        }
        else if(item.perp_sex=="F")
        {
          Fcounter+=1;
        }
      })
      entries+=1000;//offset by 1000
    }
    console.log(Fcounter, Mcounter);
    console.log(performance.now()-start)
  }
  const data = {
    labels:["Male", "Female"],
    datasets:[
    {
      backgroundColor:["#FF0000","#0000FF"],
      data:[1000, 100]
    }]
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
    const counter = {M:0,F:0};
    const dbLength = Number((await fetchData("https://data.cityofnewyork.us/resource/uip8-fykc.json?$select=count(*)"))[0].count);
    console.log(dbLength)
    const newLink = queryDBLink(
      {
        limit:dbLength,
        select:"perp_sex"
      }
    ) 
    const newData =  await fetchData(newLink);
    newData.forEach(item=>
      {
        counter[item.perp_sex] = (counter[item.perp_sex] || 0) + 1;
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

  console.log("testicle")
  //data format
  

  const EXAMPLEDATA = {
    "arrest_key": "279752532",
    "arrest_date": "2023-12-31T00:00:00.000",
    "pd_cd": "792",
    "pd_desc": "CRIMINAL POSSESSION WEAPON",
    "ky_cd": "118",
    "ofns_desc": "DANGEROUS WEAPONS",
    "law_code": "PL 2651B01",
    "law_cat_cd": "F",
    "arrest_boro": "K",
    "arrest_precinct": "73",
    "jurisdiction_code": "2",
    "age_group": "25-44",
    "perp_sex": "M",
    "perp_race": "BLACK",
    "x_coord_cd": "1009450",
    "y_coord_cd": "182401",
    "latitude": "40.66729",
    "longitude": "-73.909161",
    "lon_lat": {
      "type": "Point",
      "coordinates": [-73.909161, 40.66729]//invert this
    },
    ":@computed_region_efsh_h5xi": "17614",
    ":@computed_region_f5dn_yrer": "55",
    ":@computed_region_yeji_bk3q": "2",
    ":@computed_region_92fq_4b7q": "17",
    ":@computed_region_sbqj_enih": "46"
  }
  function delay(ms)//Delay function utilizing promise
{
    return new Promise(resolve=>setTimeout(resolve, ms))
}

</script>

<style scoped>

</style>