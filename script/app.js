//app.js for DOM manipulation
const formCity = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img')//div with icon class, and img inside that

const updateUI = (data) => {

  //destructure properties
  const {cityDetails, weather} = data;
  
  /* above is same as typing: 
    const cityDetails = data.cityDetails;
    const weather = data.weather;
  */


  //update details template 
  details.innerHTML = 
    `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Imperial.Value}</span>
    <span>&deg;F</span>`;

  

  //update night and day and icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc)
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    //above is more concise version of code below
    // let timeSrc = null;
    //   if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    //   }else{
    //     timeSrc = 'img/night.svg'
    //   };
      time.setAttribute('src', timeSrc);

      //remove display none (d-none) class if present 
      if(card.classList.contains('d-none')){
      card.classList.remove('d-none');
      }
};


const updateCity = async (city) => {
  
const cityDetails = await getCity(city);
const weather = await getWeather(cityDetails.Key);

//returning objects
return {cityDetails, weather};
/*if property name and value are the same, can delete first text.
  Originally appeared as: 
   
  cityDetails: cityDetails,
  weather: weather
   
   */

};


formCity.addEventListener('submit', e => {
  e.preventDefault();
  //get city value
  const city = formCity.city.value.trim(); //gets the trimmed value from 
  //the city class in the form
  formCity.reset();//clears out the form field

  //update UI with new city
  updateCity(city)
  .then(data => updateUI(data))
  .catch(error => console.log(error));

  //setting local storage
  localStorage.setItem('location', city);
});

if(localStorage.getItem('location')){
  updateCity(localStorage.getItem('location'))
  .then(data => updateUI(data))
  .catch(error => console.log(error))
};