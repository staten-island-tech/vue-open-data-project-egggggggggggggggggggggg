<template>
  <form>
    <select value="arrest_key">Arrest ID</select>
    <select value="=arrest_data">Date</select>
    <select value="somethingSomething">EGG</select>
  </form>
  <Doughnut :data="chartData" :options="chartOptions"></Doughnut>
</template>



<script setup>
  import { onMounted, ref, reactive } from 'vue';
  import { delay } from './utils';
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);


  const offenses = {}
  const commonData =  {
    "arrest_date": "2024-01-01T00:00:00.000",
    "pd_desc": "CRIMINAL POSSESSION WEAPON",
    "ofns_desc": "DANGEROUS WEAPONS",
    "law_cat_cd": {},
    "arrest_boro": {},
    "arrest_precinct": {},
    "jurisdiction_code": {},
    "age_group": {},
    "perp_sex": {},
    "perp_race": {},
    "arrest_key": {},
    "arrest_date":{},
    "pd_cd":{},
    "pd_desc":{},
    "ky_cd":{},
    "ofns_desc":{},
    "law_code":{},
  }//data to check
  const chartData = reactive({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My Dataset',
        data: [300, 50, 100],
        backgroundColor: ['#FF0000', '#0000FF', '#FFFF00'],
        hoverOffset: 4, 
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



  //parse data for the stuff using Object.value() and Object.keys()
  //example
  //export const data = {
  //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  //   datasets: [
  //     {
  //       backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
  //       data: [40, 20, 80, 10]
  //     }
  //   ]
  // }
  //usable info :  arrest_dates, ofns_desc, pd_desc, law_cat_cd(Felony, Misdeamenor, Violation), arrest_boro, arrest_precinct, jurisdiction_code, age_group, perp_sex, perp_race, 

  function parseCrimes(pd_desc)
  {
    pd_desc.split(",").forEach(
      crime=>
      {
        if(!offenses[crime])
        {
          offenses[crime] = 1;
          return;
        }
        else
        {
          offenses[crime] += 1;
        }
      }
    )
  }
  function commonDataCondense(dk , dv) //anything without a comma=valide
  {
    const dataKey = dk.toString();
    if(!commonData[dataKey])
    {
      return
    }
    if(dataKey=="pd_desc")
    {
      parseCrimes(dv);
      return;
    }
    const dataVal = dv.toString();
    if(!commonData[dataKey][dataVal])
    {
      commonData[dataKey][dataVal]=1;
      return;
    }
    commonData[dataKey][dataVal] +=1;
  }
  async function fetchData(url)
  {
    const newLink = await fetch(url);
    const jData =  await newLink.json();
    return jData;
  }
  async function getData()
  {
    const start =  performance.now();
    const dbLength = Number((await fetchData("https://data.cityofnewyork.us/resource/uip8-fykc.json?$select=count(*)"))[0].count);
    console.log(dbLength)
    const newLink = queryDBLink(
      {
        limit:1000,
      }
    )
    const newData =  await fetchData(newLink);
    newData.forEach(item=>
      {
        for(const [key,value] of Object.entries(item))
        {
          commonDataCondense(key, value)
        }
      }
    )
    console.log(`Took : ${Math.floor(performance.now()-start)}`);
    console.log(commonData,offenses)
  }
  onMounted(()=>
  {
    getData();

  })
  function queryDBLink(searchParams)
  {
    let baseURL = `https://data.cityofnewyork.us/resource/uip8-fykc.json?`
    for(const [key, value] of Object.entries(searchParams))
    {
      baseURL+=`$${key}=${value}&`
    }
    return baseURL;
  }
</script>

<style scoped>

</style>