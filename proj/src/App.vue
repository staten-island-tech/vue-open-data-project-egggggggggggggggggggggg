<template>
  <div id="map" style="height:500px; width:100%"></div>
  <div v-for="(item, index) in arrestData" :key="index"
  :style="
  {
    width:`500px`,
    margin:`100px`
  }">
    {{ item }}
  </div>
</template>



<script setup>
  import { onMounted, ref } from 'vue';
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  const arrestData =  ref('');
  const testlink =  `https://data.cityofnewyork.us/resource/8h9b-rp9u.json?$select=perp_sex`
  let Mcounter= 0;
  let Fcounter= 0;

  async function getData()
  {
    const fetchedData = await fetch(testlink)
    const jsonedData =  await fetchedData.json();
    arrestData.value = jsonedData;
    const start=performance.now();
    jsonedData.forEach(item=>
      {
        if(item.perp_sex=="M")
        {
          Mcounter+=1; 
        }
        else if(item.perp_sex=="F")
        {
          Fcounter+=1;
        }
      }
    )
    console.log(Fcounter, Mcounter);
    console.log(performance.now()-start)
  }
  onMounted(()=>
  {
    getData();
    console.log(arrestData)
    const map = L.map("map").setView([40.7128, -74.0060], 12); // NYC coords
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);
    L.marker([40.7128, -74.0060])
      .addTo(map)
      .bindPopup("Hello, NYC!")
      .openPopup();
  })

  function start()
  {
    
  }
  function queryDB(col, value)
  {
    return `https://data.cityofnewyork.us/resource/8h9b-rp9u.json$${col}=${value}`
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


</script>

<style scoped>

</style>