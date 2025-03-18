<template>
    <div class="optionsBar">
        <div class="options" @click="$emit(`eggsandwhich`)">Heat Map</div>
        <div class="options" @click="$emit(`ligma`)">Chart Data</div>
        <div class="options" @click="$emit(`sigma`)">Time Line</div>
    </div>
    
</template>

<script setup>
</script>

<style scoped>
    /* Container for the options bar */
    .optionsBar {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 220px;
        height: 100vh;
        background-color: #f7e7ce;
        padding: 20px 0;
        box-sizing: border-box;
    }

    /* Individual option items */
    .options {
        width: 180px;
        height: 60px; /* Adjust height for a balanced look */
        margin-bottom: 10px; /* Space between options */
        background-color: #f7e7ce;
        color: #333; /* Darker text for readability */
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    }

    /* Hover effect for each option */
    .options:hover {
        background-color: #E3BC9A;
        transform: translateY(-2px); /* Slight lift effect */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow intensifies on hover */
    }

    /* Active/Selected option style */
    .changeStyling {
        background-color: #333;
        color: white;
    }
</style>
