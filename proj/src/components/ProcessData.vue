<template>
  <form>
    <select v-model="dataType">
      <option value="perp_race">Sort by Race</option>
      <option value="perp_sex">Sort by Sex</option>
      <option value="perp_boro">Sort by Borough</option>
      <option value="perp_race">Sort by Race</option>
      <option value="perp_race">Sort by Race</option>
    </select>
  </form>
  <Doughnut :data="chartData" :options="chartOptions" :key="testKey" style="width:10%;height: 10%;"></Doughnut>
</template>



<script setup>
//file for aggregating data
//use this file to pull the data needed to update visual changes for the user
//time line = show the rate of crime per specified m||d||y
//heatmap = map showing where crime is most common, possibly aggregate the values by a given zone


  import { onMounted, ref, reactive } from 'vue';
  import { Doughnut } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

  const testKey = ref(0);
  const dataType = ref("");
  const offenses = {}
  const commonData =  {
    "arrest_date": {},
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
    console.log(data, labels)
    chartData.datasets[0].data = data;
    chartData.labels = labels;
    chartData.datasets[0].backgroundColor = uniqueColors(data.length);
    console.log(chartData)
  }
  function uniqueColors(numOfColors)
  { 
    const colors =  [];
    for(let i = 0; i<numOfColors; i++)
    {
      const hue = (i*360)/ numOfColors;
      colors.push(RGBtoHex(HSLtoRGB(hue, .9, .5)));
    }
    return colors;
  }
  function HSLtoRGB(h,s,l)
  {
    const chroma = (1-Math.abs(2*l-1))*s;
    const h2 = (h/60);
    const x = chroma * (1-Math.abs(h2%2-1));
    const m =  l-(chroma/2);
    const rgbMap = [
      [chroma, x, 0],
      [x, chroma, 0],
      [0, chroma, x],
      [0, x, chroma],
      [x, 0, chroma],
      [chroma, 0, x]
    ];
    let [r,g,b] = rgbMap[Math.floor(h2%6)];
    return [Math.round(((r+m)*255)),Math.round(((g+m)*255)),Math.round(((b+m)*255))];
  }
  function RGBtoHex(rgb)
  {
    return `#${rgb[2].toString(16).padStart(2,"0")}${rgb[1].toString(16).padStart(2,"0")}${rgb[0].toString(16).padStart(2,"0")}`
  }
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
    let dataVal = dv.toString();
    if(dataKey=="arrest_date")
    {
      dataVal = dataVal.split('T')[0].split('-');
      console.log(dataVal)
      const year = `Year: ${dataVal[0]}`;
      const month =  `Month: ${dataVal[1]}`;
      const day =  `Day: ${dataVal[2]}`;
      commonData[dataKey][year] = (commonData[dataKey][year] || 0) + 1;
      commonData[dataKey][month] = (commonData[dataKey][month] || 0) + 1;
      commonData[dataKey][day] = (commonData[dataKey][day] || 0) + 1;
      return;
    }
    if(dataKey=="arrest_key"){return}
    commonData[dataKey][dataVal] = (commonData[dataKey][dataVal] || 0) + 1;
  }
  function checkValidity(dataKey, dataVal)
  {
    //idk for commonDateCOndense
  }
  async function fetchData(url)
  {
    const newLink = await fetch(url);
    const jData =  await newLink.json();
    return jData;
  }
  async function somethingSomethingSomethingSomething()
  {
    
  }
  async function getData()
  {
    const start =  performance.now();
    const dbLength = Number((await fetchData("https://data.cityofnewyork.us/resource/uip8-fykc.json?$select=count(*)"))[0].count);
    console.log(dbLength)
    const newLink = queryDBLink(
      {
        limit:100,
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
  async function test()
  {
    await getData();
    changeData("arrest_boro");
    
    testKey.value+=1;
  }
  onMounted(()=>
  {
    test();
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