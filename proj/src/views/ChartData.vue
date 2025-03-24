<template>
    <Doughnut :options="chartOptions" :data="chartData" :key="regenerate"></Doughnut>
</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue';
    import { Doughnut } from 'vue-chartjs';
    import { uniqueColors } from '@/utils';
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
    const regenerate = ref(0);
    const offenses = {}
    const commonData =  JSON.parse(localStorage.getItem("data"));
    const chartData = reactive({
    labels: ['Red', 'Blue', 'Yellow','Black'],
    datasets: [
      {
        label: 'My Dataset',
        data: [300, 50, 100, 1000],
        backgroundColor: ['#FF0000', '#0000FF', '#FFFF00', '#110020'],
        hoverOffset: 4, 
        borderColor: 'rgba(255,255,255,255)'
      },
    ],
    });
    const chartOptions = reactive({
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
            label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
            },
            },
        },
        },
    });
    function changeData(dType)
    {
        //implement some sort of data changing thingie majingie here based on data type
        if(dType=="arrest_date")
        {
        
        }
        else if(dType=="")
        {
        
        }
        const data = Object.values(commonData[dType]);
        const labels = Object.keys(commonData[dType]);  
        chartData.datasets[0].data = data;
        chartData.labels = labels;
        chartData.datasets[0].backgroundColor = uniqueColors(data.length);
    }
    async function test()
    {
        changeData("longitude");
        regenerate.value+=1;
    }
    onMounted(()=>
    {
        test();
    })
    
</script>

<style scoped>

</style>