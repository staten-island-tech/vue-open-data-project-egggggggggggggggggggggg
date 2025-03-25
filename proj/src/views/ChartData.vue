<template>
    <Doughnut :options="chartOptions" :data="chartData" :key="regenerate"></Doughnut>
    <form class="selector" @submit.prevent @change="changeData(option)">
        <select id="dropdownMenu" default="arrest_boro" v-model="option">
            <option @click="changeData('pd_desc')">pd_desc</option>
            <option @click="changeData('ofns_desc')">ofns_desc</option>
            <option @click="changeData('law_cat_cd')">law_cat_cd</option>
            <option @click="changeData('arrest_boro')">arrest_boro</option>
            <option @click="changeData('arrest_precinct')">arrest_precinct</option>
            <option @click="changeData('jurisdiction_code')">jurisdiction_code</option>
            <option @click="changeData('age_group')">age_group</option>
            <option @click="changeData('perp_sex')">perp_sex</option>
            <option @click="changeData('perp_race')">perp_race</option>
            <option @click="changeData('arrest_key')">arrest_key</option>
            <option @click="changeData('arrest_date')">arrest_date</option>
            <option @click="changeData('pd_cd')">pd_cd</option>
            <option @click="changeData('ky_cd')">ky_cd</option>
            <option @click="changeData('law_code')">law_code</option>
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