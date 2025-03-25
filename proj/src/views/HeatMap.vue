<template>
  <div id="app">
    <div id="map" ref="map" class="map-container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'; // Import Vue Composition API functions
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import leaflet.heat plugin
let data = JSON.parse(localStorage.getItem("data"));
const map = ref(null); // Create a ref for the map container

// Function to initialize the map
const initializeMap = () => {
  // Create the map object and set its initial view (latitude, longitude, zoom level)
  const leafletMap = L.map(map.value).setView([40.7128, -74.0060], 15);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(leafletMap);

  // Aggregate all heat data into a single array
  const heatData = data.coordinates.map(element => [element[1], element[0], 0.5]);

  // Add heatmap layer with the aggregated data
  L.heatLayer(heatData, {
    radius: 10,  // Adjust size of the heat points
    blur: 0.1,   // Adjust blur intensity
    maxZoom: 15, 
  }).addTo(leafletMap);
};

// Lifecycle hook to run the map initialization after component is mounted
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
.map-container {
  height: 500px; /* Set the height of the map */
  width: 100%; /* Make the map responsive */
}
</style>
