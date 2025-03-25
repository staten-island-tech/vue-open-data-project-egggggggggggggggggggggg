<template>
    <Line :data="lineChartData" :options="lineChartOptions" :key="chartKey"></Line>
    <button>Month</button>
</template>
    
<script setup>
    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; 
    import { Line } from 'vue-chartjs'; ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    import { onMounted, reactive, ref } from 'vue'
    import { monthName } from '@/utils';
    const data =  JSON.parse(localStorage.getItem("data"));
 //probably the stupidest thing ive ever written
    const months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const chartKey = ref(0);
    const lineChartData = 
    reactive({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: 
        [{
            label: 'Janurary',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
        }]
    })
    const lineChartOptions = 
    reactive({
        responsive: true,
        maintainAspectRatio: true
    })
    function displayMonthData()
    {
        lineChartData.labels = months;
        const actualDates = data.arrest_date;
        const actualStuff = []
        for(const [key, value] of Object.entries(actualDates))
        {
            let counter = 0;
            for(const[key2, value2] of Object.entries(value))
            {
                counter+=value2;
            }
            actualStuff.push(counter);//at the end of the count just set it to the the key        
            console.log(counter)
        }
        console.log(actualStuff)
        lineChartData.datasets[0].data = actualStuff;
        chartKey.value++;
        console.log(lineChartData)
    }
    function sortOneMonth(month)
    {
        lineChartData.labels = Object.keys(data.arrest_date[month]);
        lineChartData.datasets[0].data = Object.values(data.arrest_date[month]) 
        chartKey.value++;
    }
    
    onMounted(()=>
    {
        displayMonthData();
        sortOneMonth("01")
    }
    )
    
</script>

<style scoped>

</style>