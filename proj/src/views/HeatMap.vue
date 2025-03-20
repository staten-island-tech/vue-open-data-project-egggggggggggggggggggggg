<template>
  <div id="app">
    <div id="map" ref="map" class="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat'; // Import leaflet.heat plugin

export default {
  name: 'LeafletMap',
  mounted() {
    // Initialize the map
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      // Create the map object and set its initial view (latitude, longitude, zoom level)
      const map = L.map(this.$refs.map).setView([74.0060, 40.7128], 13);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Example data points for the heatmap (latitude, longitude, intensity)
      const heatData = [
        [51.505, -0.09, 1.0], // Lat, Lng, Intensity
      ];

      // Add heatmap layer to the map
      L.heatLayer(heatData, {
        radius: 100, // Size of the heatmap points
        blur: 1,      // Blur intensity of the points
        maxZoom: 15,   // Maximum zoom level for the heatmap
      }).addTo(map);

      // Optional: Add a marker to show additional interaction
    },
  },
};
</script>

<style scoped>
.map-container {
  height: 500px; /* Set the height of the map */
  width: 100%; /* Make the map responsive */
}
</style>
