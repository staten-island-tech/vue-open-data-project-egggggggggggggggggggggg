<template>
  <OptionsMenu></OptionsMenu>
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
  
  

</script>

<style scoped>
</style>