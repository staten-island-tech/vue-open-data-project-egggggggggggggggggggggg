<template>
  <div class="container">
    <header class="top-bar">
      <OptionsMenu /> <!-- Assuming this is a top bar menu, let it be on the right or left -->
    </header>

    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      <button @click="clearStorage" class="clear-cache-btn">Clear Cache</button>
    </footer>
  </div>
</template>

<script setup>
//file for aggregating data
//use this file to pull the data needed to update visual changes for the user
//main file to process data will be js file. for each graph time import different areas of that main processedData variable 
//

  import { onMounted, ref, reactive } from 'vue';
  import { delay, HSLtoRGB, uniqueColors, RGBtoHex, queryDBLink } from './utils.js'
  import OptionsMenu from './components/OptionsMenu.vue';
  import { getData,commonData } from './dataProcess.js';
  const timeLimit = 60*60*24*30*1000;//cached data expires in a month idk if this a good idea or nah
  async function test()
  {
    if(Date.now() - (Number(localStorage.getItem("timestamp")) || 0) >= timeLimit||!localStorage.getItem("data"))
    {
      await getData();
      console.log("recaching data")
      localStorage.setItem("data",JSON.stringify(commonData));
      localStorage.setItem("timestamp",Date.now());
      console.log("setdata")
    }
    console.log("fetched cached data")
    let data =  (localStorage.getItem("data"));
    console.log(JSON.parse(data),"data here");
  }
  async function clearStorage()
  {
    localStorage.clear();
    await test();
    location.reload();
  }
  
  test();

</script>

<style scoped>
/* Container to manage layout */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Top bar style */
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

/* Main content area */
.content {
  flex-grow: 1;
  margin-top: 60px; /* Offset for fixed top bar */
  padding: 20px;
  overflow-y: auto;
}

/* Footer style */
.footer {
  background-color: #f4f4f4;
  padding: 10px 20px;
  text-align: center;
}

/* Clear cache button */
.clear-cache-btn {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.clear-cache-btn:hover {
  background-color: #0056b3;
}
</style>