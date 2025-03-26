<template>
  <nav class="optionsBar">
    <router-link 
      to="/heatmap" 
      class="navOpt" 
      :class="{ active: $route.path === '/heatmap' }" 
      >
      Heatmap
    </router-link>

    <router-link 
      to="/timeline" 
      class="navOpt" 
      :class="{ active: $route.path === '/timeline' }" 
      >
      Timeline
    </router-link>

    <router-link 
      to="/chartdata" 
      class="navOpt" 
      :class="{ active: $route.path === '/chartdata' }" 
      >
      Charts
    </router-link>
  </nav>
</template>

<style scoped>
.optionsBar {
  display: flex;
  width:100px;
  height:30px;
  align-items: center;
  text-align: center;
  
}

.navOpt {
  padding: 10px 15px;
  text-decoration: none;
  color: black;
  height:100%;
  transition: background 0.3s;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.navOpt:hover {
  background: lightgray;
}

.navOpt.active {
  background: #007ACC;
  color: white;
  font-weight: bold;
}
</style>
