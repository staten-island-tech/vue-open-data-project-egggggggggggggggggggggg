<template>
    <div class="optionsBar">
        <div class="options">Heat Map</div>
        <div class="options">Chart Data</div>
        <div class="options">Time Line</div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .options
    {
        width:200px;
        height:10%;
        overflow:hidden;
        background-color: #f7e7ce;
        display: flex;
        justify-content: center;
        transition: background-color 0.3s ease-in-out;
    }
    .optionsBar
    {
        text-align: center;
        align-items: center;
        width:200px;
        height:100vh;
        background-color:#f7e7ce;
    }
    .options:hover
    {
        background-color: #E3BC9A;
    }
    .changeStyling
    {
        background-color: black;
        color:white;
    }
</style>