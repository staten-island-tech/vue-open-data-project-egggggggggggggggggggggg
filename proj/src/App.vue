<template>
  <nav>
    <router-link to="/heatmap">Ligma</router-link>
    <router-link to="/timeline">Ligma</router-link>
    <router-link to="/chartdata">Ligma</router-link>
  </nav>
  <div class="stuff">
    <OptionsMenu @eggsandwhich="printLigma" @ligma="" @sigma="printLigma"></OptionsMenu>
    <ProcessData class="size"></ProcessData>
  </div>

</template>

<script setup>
import OptionsMenu from './components/OptionsMenu.vue';
import ProcessData from './components/ProcessData.vue';
function printLigma()
{
  console.log("Ligma")
}


</script>

<style scoped>
  .stuff
  {
    display:flex;
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
  } 
  router-link
  {
    width:100px;
    height:100px;
  }
</style>