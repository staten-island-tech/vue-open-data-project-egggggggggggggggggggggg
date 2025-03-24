<template>
  <OptionsMenu></OptionsMenu>
  <button @click="clearStorage">Clear Cache</button>
  <router-view>
    </router-view>
</template>

<script setup>
//file for aggregating data
//use this file to pull the data needed to update visual changes for the user
//main file to process data will be js file. for each graph time import different areas of that main processedData variable 
//

  import { onMounted, ref, reactive } from 'vue';
  import { delay, HSLtoRGB, uniqueColors, RGBtoHex, queryDBLink } from './utils.js'
  import OptionsMenu from './components/OptionsMenu.vue';
  import { getData,commonData } from './dataProcess.js';
  const timeLimit = 60*60*24*30*1000;
  async function test()
  {
    if(Date.now() - (Number(localStorage.getItem("timestamp")) || 0) >= timeLimit||!localStorage.getItem("data"))
    {
      await getData();
      console.log("recaching data")
      localStorage.setItem("data",JSON.stringify(commonData));
      localStorage.setItem("timestamp",Date.now());
      console.log("setdata")
    }
    console.log("fetched cached data")
    let data =  (localStorage.getItem("data"));
    console.log(JSON.parse(data),"data here");
  }
  function clearStorage()
  {
    localStorage.clear();
    location.reload();
  }
  
  test();

</script>

<style scoped>
</style>