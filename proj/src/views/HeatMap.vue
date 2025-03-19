<template>
    <div ref="map" style="height: 500px;"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import L from 'leaflet';
  import 'leaflet.heat'; // Import leaflet.heat plugin
  
  const mapRef = ref(null); // The ref to the map div
  
  // Sample data for the heatmap (latitude, longitude, intensity)
  const heatData = [
    [51.505, -0.09, 0.5],
    [51.515, -0.1, 0.6],
    [51.525, -0.11, 0.7],
    [51.535, -0.12, 0.8]
  ];
  
  onMounted(() => {
    console.log("failed")

      // Initialize the map
      const map = L.map(mapRef.value).setView([51.505, -0.09], 13);
      // Add a tile layer (e.g., OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      // Add the heatmap layer
      L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 17
      }).addTo(map);

  });
  </script>
  
  <style scoped>
  /* Styles for your map */
  #map {
    height: 100%;
  }
  </style>
  