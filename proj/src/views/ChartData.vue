<template>
    <Doughnut :options="chartOptions" :data="chartData" :key="regenerate"></Doughnut>
    <form class="selector" @submit.prevent @change="changeData(option)">
        <select id="dropdownMenu" default="arrest_boro" v-model="option">
            <option>pd_desc</option>
            <option>ofns_desc</option>
            <option>law_cat_cd</option>
            <option>arrest_boro</option>
            <option>age_group</option>
            <option>perp_sex</option>
            <option>perp_race</option>
            <option>arrest_date</option>
        </select>
    </form>

</template>

<script setup>
    //semi done just add some css and stuff make it look better
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
        //implement some sort of data changing thingie majingie here based on data type
        if(dType=="arrest_date")
        {
        
        }
        else if(dType=="")
        {
        
        }
        console.log(dType)
        const data = Object.values(commonData[dType]);
        const labels = Object.keys(commonData[dType]);  
        chartData.datasets[0].data = data;
        chartData.labels = labels;
        chartData.datasets[0].backgroundColor = uniqueColors(data.length);
        regenerate.value+=1;
    }
    async function test()
    {
        changeData("arrest_boro");
    }

    onMounted(()=>
    {
        test();
    })
    
</script>

<style scoped>

</style>