<template>
    <router-link :to="pkmnPath">
        {{ pokemon.id }}
        {{  }}
    </router-link>
</template>

<script setup>
    import { computed } from 'vue';
    const props =  defineProps({
        pokemon : Object,
    })
    const pkmnPath =  computed(()=>
    {
        return `/pokemon/${id}`
    })
</script>

<style scoped>

</style>