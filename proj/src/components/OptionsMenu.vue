<template>
    <nav class="optionsBar">
      <div class="navOpt" @click="$emit(`heatmap`,commonData)">
        <router-link to="/heatmap">Heatmap</router-link>
      </div>
      <div class="navOpt" @click="$emit(`timeline`,commonData)"> 
        <router-link to="/timeline">TimeLine</router-link>
      </div>
      <div class="navOpt" @click="$emit(`chartData`, commonData)">
        <router-link to="/chartdata">ChartData</router-link>
      </div>
      <div class="navOpt" @click="$emit(`chartData`, commonData)">
        <router-link to="/search">Search</router-link>
      </div>
    </nav>
</template>

<script setup>
//for opt menu create 3 divs for each of th enav buttons. use those to directly redirect to the site neeed. 
</script>

<style scoped>  
    .optionsBar
    {
        width:100%;
        height:100px;
        background:lightgreen;
        display:flex;
    }
    .navOpt
    {
        width:100px;
        padding:10px;
        flex-direction: row;
        border: black;
        background-color: green;
        margin: 5px;
        align-items: center;
    }


</style>