<template>
  <div class="container">
    <header class="top-bar">
      <OptionsMenu /> 
    </header>
    
    <main class="content">
      <div v-if="loading" class="loadThingie">wait for da data to be cached</div>
      <router-view />
    </main>

    <footer class="footer">
      <button @click="clearStorage" class="clear-cache-btn">Clear Cache</button>
    </footer>
  </div>
</template>

<script setup>


  import { onMounted, ref, reactive } from 'vue';
  import { delay, HSLtoRGB, uniqueColors, RGBtoHex, queryDBLink } from './utils.js'
  import OptionsMenu from './components/OptionsMenu.vue';
  import { getData,commonData } from './dataProcess.js';
  const loading =  ref(false);
  const timeLimit = 60*60*24*30*1000;
  async function test()
  {
    if(Date.now() - (Number(localStorage.getItem("timestamp")) || 0) >= timeLimit||!localStorage.getItem("data"))
    {
      
      loading.value=true;
      await getData();
      console.log("recaching data")
      localStorage.setItem("data",JSON.stringify(commonData));
      localStorage.setItem("timestamp",Date.now());
      console.log("setdata")
      changeDaMsg();
      await delay(1000);
      location.reload();
    }
  }
  function changeDaMsg()
  {
    document.querySelector(".loadThingie").innerHTML = "is done site being reloaded"
    
  }
  async function clearStorage()
  {
    localStorage.clear();
    await test();
  }
  
  test();

</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .loadThingie {
    position: fixed; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    padding: 20px 30px;
    font-size: 18px;
    font-weight: bold;
    background-color: #ffffff;
    color: #333333;
    width:200px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(24, 24, 24, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: center;
    z-index: 9999;
    
    transition: opacity 0.3s ease;
  }
  .top-bar {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .top-bar .logo {
    font-size: 24px;
  }

  .content {
    flex-grow: 1;
    margin-top: 60px; 
    padding: 20px;
    overflow-y: auto;
  }

  .footer {
    background-color: #f4f4f4;
    padding: 10px 20px;
    text-align: center;
  }

  .clear-cache-btn {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .clear-cache-btn:hover {
    background-color: #0056b3;
    transform:translate(-2px , -2px);
  }
  .clear-cache-btn:active
  {
    background-color: #007BFF;
    transform: translate(0px);
  }
</style>