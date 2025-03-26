<template>
    <div class="container">
        <Doughnut :options="chartOptions" :data="chartData" :key="regenerate"></Doughnut>
        <form class="selector" @submit.prevent @change="changeData(option)">
        <select id="dropdownMenu" v-model="option">
            <option value="ofns_desc">Crime Type</option>
            <option value="law_cat_cd">Sort by Crime Severity</option>
            <option value="arrest_boro">Sort by Arrest Boro</option>
            <option value="age_group">Sort by Age Group</option>
            <option value="perp_sex">Sort by Sex</option>
            <option value="perp_race">Sort by Race</option>
        </select>
    </form>
    </div>

</template>

<script setup>
    import { onMounted, ref, reactive } from 'vue';
    import { Doughnut } from 'vue-chartjs';
    import { uniqueColors } from '@/utils';
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
    const regenerate = ref(0);
    const offenses = {}
    const option = ref("arrest_boro");
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
        const data = Object.values(commonData[dType]);
        const labels = Object.keys(commonData[dType]);  
        chartData.datasets[0].data = data;
        chartData.labels = labels;
        chartData.datasets[0].backgroundColor = uniqueColors(data.length);
        regenerate.value+=1;
    }

    onMounted(()=>
    {
        changeData("arrest_boro");
    })
    
</script>

<style scoped>
    .container {
        padding: 20px;
        height:100%;
        background-color: #f9f9f9;
        border-radius: 8px;
        align-items: center;
        display: flex;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .selector {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    #dropdownMenu {
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        background-color: #fff;
        transition: border 0.3s ease, box-shadow 0.3s ease;
    }
    #dropdownMenu option {
        padding: 10px;
        font-size: 16px;
    }
</style>