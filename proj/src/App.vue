<template>
  <div v-for="item in arrestData" :key="item.arrest_key"
  :style="
  {
    width:`500px`,
    margin:`100px`
  }">
    {{ item.pd_desc }}
    {{ item }}
  </div>
</template>



<script setup>
  import { onMounted, ref } from 'vue';
  const arrestData =  ref('');
  async function getData()
  {
    const fetchedData = await fetch("https://data.cityofnewyork.us/resource/8h9b-rp9u.json")
    const jsonedData =  await fetchedData.json();
    arrestData.value = jsonedData;
  }
  onMounted(()=>
  {
    getData();
    console.log(arrestData)
  })
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
      "coordinates": [-73.909161, 40.66729]
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