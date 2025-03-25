<template>
    <div class="page">
        <div class="left scroll" @click="page-=1"><</div>
        <input class="pageinput" type="text" value="1">
        <div class="right scroll" @click="page+=1"> ></div>
    </div>
    
</template>

<script setup>
    import { ref } from 'vue';
    //set a limit for how many pages you can scroll based off of dbLength
    
    const page =  ref(0)
    function change(type)
    {
        if(type=="decrement")
        {
            
        }
    }
</script>

<style scoped>
    .scroll
    {
        width:30px;
        height:50px;
        border-radius: 50px;
        align-items: center;
        text-align: center;
        justify-content: center;
        display:flex;
        margin:10px;
    }
    .scroll:hover
    {
        background-color: lightgrey;
    }
    .pageinput
    {
        text-align: center;
        width:25px;
        height:20px;
        border-radius: 5px;
        border: solid 1px gray;
    }
    .page
    {
        margin:10px;
        display:flex;
        align-items: center;
    }
</style>