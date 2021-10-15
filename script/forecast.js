//forecast.js is for interacting with weather api

const key = '9HlKRDeGD4cYkzacaYU7dEvMAyO7Rkv3';

//gets weather information
const getWeather = async (id) => {//location id

  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;//location id is from location key 
  
  const response = await fetch(base + query);//await the promise until it resolves
  const data = await response.json();
  return data[0]; 
  
};

//gets city information
const getCity = async (city) => {
  
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;
  //? adds a query parameter

  const response = await fetch(base + query);
  const data = await response.json();

  //console.log(data[0]);//add [0] for the closest city match

  return data[0];

};


