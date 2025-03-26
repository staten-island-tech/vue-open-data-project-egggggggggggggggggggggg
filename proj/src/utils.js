function delay(ms)//Delay function utilizing promise
{
    return new Promise(resolve=>setTimeout(resolve, ms))
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
function queryDBLink(searchParams)
{
  let baseURL = `https://data.cityofnewyork.us/resource/uip8-fykc.json?`
  for(const [key, value] of Object.entries(searchParams))
  {
    baseURL+=`$${key}=${value}&`
  }
  return baseURL;
}
function monthName(num)
{
  const date = new Date(0, num-1);
  return date.toLocaleString('default', {month:"long"});
}
function cacheData(data, unique_key, expireTime)//im prob not gonna use this 
{
  localStorage.setItem(unique_key, data)
  localStorage.setItem(unique_key+"expiryDate",
    {
      timestamp:Date.now(),
      expiration:expireTime
    }
  );
}
function retrieveData(unique_key)//check if valid to retrieve cached data. 
{
  const timestuff =  JSON.parse(localStorage.getItem(unique_key+"expiryDate") )
  if(Time.now() - timestuff.timestamp <= timestuff.expiration)
  {
    return false;
  }
  else
  {
    return true;
  }
}
async function fetchData(url)
{
  const newLink = await fetch(url);
  const jData =  await newLink.json();
  return jData;
}
export { delay, HSLtoRGB, uniqueColors, RGBtoHex, queryDBLink, monthName, fetchData }
