<template>
  <div>
    <div v-for="(thing,index) in data" :key="thing.name">
      {{ thing.name }}
      {{ index + 1 }}
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  const data = ref(``);
  async function test()
  {
    const fetched =  await fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    const jsndata =  await fetched.json();
    data.value =  jsndata.results;
  }
  onMounted(()=>
  {
    test();
  })
</script>

<style scoped>

</style>