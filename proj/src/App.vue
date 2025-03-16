<template>
  <div class="stuff">
    <OptionsMenu></OptionsMenu>
    <ProcessData class="size"></ProcessData>
  </div>

</template>

<script setup>
import OptionsMenu from './components/OptionsMenu.vue';
import ProcessData from './components/ProcessData.vue';


</script>

<style scoped>
  .stuff
  {
    display:flex;
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
  } 
</style>