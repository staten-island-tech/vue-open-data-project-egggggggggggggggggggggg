<template>
    <div class="lineContainer">
        <Line :data="lineChartData" :options="lineChartOptions" :key="chartKey" class="style"></Line>
    </div>
    <button @click="load=true">Individual Month</button>
    <button @click="displayMonthData(); load=false;">Whole Year</button>
    <form class="selector" v-if="load" @submit.prevent @change="sortOneMonth(month)">
        <select id="dropdownMenu" v-model="month">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </form>
</template>
    
<script setup>
    import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'; 
    import { Line } from 'vue-chartjs'; ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    import { onMounted, reactive, ref } from 'vue'
    import { parse } from 'vue/compiler-sfc';
    const data =  JSON.parse(localStorage.getItem("data"));
    const months = ['Janurary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const chartKey = ref(0);
    const load = ref(false);
    const month =  ref("01")
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
            actualStuff.push(counter);
        }
        lineChartData.datasets[0].data = actualStuff;
        lineChartData.datasets[0].label = "2024"
        chartKey.value++;
    }
    function sortOneMonth(month)
    {
        const monthData =  Object.entries(data.arrest_date[month])
        const perDay = [];
        const days = Array.from({ length: (monthData).length }, (_, i) => i + 1);
        for(let i = 0; i<monthData.length;i++)
        {
            const parsed =  parseInt(monthData[i],10);
            perDay[parsed-1] = monthData[i][1];
        }
        lineChartData.labels = days;
        lineChartData.datasets[0].data = perDay;
        lineChartData.datasets[0].label = months[parseInt(month, 10)-1];
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
    .lineContainer
    {
        width:100%;
        height:90%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border-radius: 10px;
    }
    button {
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        border: 1px solid transparent;
        background-color: #6c7ae0;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        margin:10px;
    }
    button:hover {
        background-color: #5a67d8;
        transform: translateY(-2px);
    }
    button:active {
        background-color: #4c53b0;
        transform: translateY(0);
    }
    #dropdownMenu {
        margin:10px;
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