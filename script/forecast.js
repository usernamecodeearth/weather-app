class Forecast{
  constructor(){
    this.key = 'JSq081LkY1dchE0dwcPkKt0ConMY86DS';
    this.weatherURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  }
  async updateCity(city){
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return {cityDetails, weather};
  }
  async getCity(city){
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  } 
  async getWeather(id){
    const query = `${id}?apikey=${this.key}`;//location id is from location key 
    const response = await fetch(this.weatherURI + query);//await the promise until it resolves
    const data = await response.json();
    return data[0]; 
  }
}




