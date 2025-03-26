<template>
  <div id="app">
    <div id="map" ref="map" class="map-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; 
let data = JSON.parse(localStorage.getItem("data"));
const map = ref(null); 
const initializeMap = () => {
  const leafletMap = L.map(map.value).setView([40.7128, -74.0060], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(leafletMap);
  const heatData = data.coordinates.map(element => [element[1], element[0], 0.1]);
  L.heatLayer(heatData, {
    radius: 10,  
    blur: 1.0,   
    maxZoom: 15, 
  }).addTo(leafletMap);
};
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
.map-container {
  height: 2000px; /*stuff below viewport doesnt actually get rendered by leaflet so not a big issue*/
  width: 100%;
}
</style>
