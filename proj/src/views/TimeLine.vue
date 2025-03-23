<template>
    <Line :data="lineChartData" :options="lineChartOptions"></Line>
</template>
    
<script setup>
    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; 
    import { Line } from 'vue-chartjs'; ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    import { commonData } from '../dataProcess.js'
    import { onMounted } from 'vue'
    const lineChartData = 
    {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: 
        [{
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
        }]
    }
    const lineChartOptions = 
    {
        responsive: true,
        maintainAspectRatio: true
    }
    console.log("common data", commonData)
    onMounted(()=>
    {
        console.log("skibid toilet")
    }
    )
    
</script>

<style scoped>

</style>