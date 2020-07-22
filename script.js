//Showing current time
let now = new Date();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let currentTime = document.querySelector(`#current-time`);
currentTime.innerHTML = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

//Search engine to display city name in banner
//Show city's matching temperature
let cityForm = document.querySelector(`form`);
cityForm.addEventListener(`submit`, searchCity);

let celsius = document.querySelector(`#celsius`);
celsius.addEventListener(`click`, searchCity);

function searchCity(element) {
  element.preventDefault();
  let heading = document.querySelector(`#banner`);
  let input = document.querySelector(`#search-city`);
  let theInput = input.value.toLowerCase().trim();

  let apiKey = `5823f95be100eb78af18e8efbba8c1c5`;
  let units = `metric`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${theInput}&appid=${apiKey}&units=${units}`;

  if (theInput.length > 0) {
    heading.innerHTML = `${theInput}`;
    axios.get(apiUrl).then(showTemp);
  }
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let weatherDisplay = document.querySelector(`#current-degrees`);

  weatherDisplay.innerHTML = `${temp}`;

  let weatherInfo = document.querySelector(`#weather-info`);
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity} kg/m<sup>3</sup>, <br/> Wind Speed: ${response.data.wind.speed} kmph`;

  response.data.weather.forEach((element) => {
    let theDescription = element.description;
    let weather = document.querySelector(`#weather-description`);
    weather.innerHTML = `${theDescription}`;
  });
  if (temp > 11) {
    let symbol = document.querySelector(`#icon`);
    symbol.innerHTML = `<i class="fas fa-temperature-high"></i>`;
  } else {
    symbol.innerHTML = `<i class="fas fa-temperature-low"></i>`;
  }
}

//Changing from fahrenheit to celsius
let fahrenheit = document.querySelector(`#fahrenheit`);
fahrenheit.addEventListener(`click`, changeDegreesToF);

function changeDegreesToF() {
  let input = document.querySelector(`#search-city`);
  let theInput = input.value.toLowerCase().trim();

  let apiKey = `5823f95be100eb78af18e8efbba8c1c5`;
  let units = `imperial`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${theInput}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showFahrenheit);
}

function showFahrenheit(response) {
  let temp = Math.round(response.data.main.temp);
  let weatherDisplay = document.querySelector(`#current-degrees`);
  weatherDisplay.innerHTML = `${temp}`;

  let weatherInfo = document.querySelector(`#weather-info`);
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity} lbs/ft<sup>3</sup> <br/> Wind Speed: ${response.data.wind.speed} mph`;
}

//Current location button - celsius
let button = document.querySelector(`.btn-success`);
button.addEventListener(`click`, geoLocC);

let celsiusCurrent = document.querySelector(`#celsius`);
celsiusCurrent.addEventListener(`click`, geoLocC);

function geoLocC() {
  navigator.geolocation.getCurrentPosition(showMyLocationC);
}

function showMyLocationC(position) {
  let apiKey = `5823f95be100eb78af18e8efbba8c1c5`;
  let units = `metric`;

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showMyTempC);
}
function showMyTempC(response) {
  let temp = Math.round(response.data.main.temp);
  let weatherDisplay = document.querySelector(`#current-degrees`);
  weatherDisplay.innerHTML = `${temp}`;

  let heading = document.querySelector(`#banner`);
  heading.innerHTML = `${response.data.name}`;

  let weatherInfo = document.querySelector(`#weather-info`);
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity} kg/m<sup>3</sup> <br/> Wind Speed: ${response.data.wind.speed} kmph`;

  response.data.weather.forEach((element) => {
    let theDescription = element.description;
    let weather = document.querySelector(`#weather-description`);
    weather.innerHTML = `${theDescription}`;
  });

  if (temp > 11) {
    let symbol = document.querySelector(`#icon`);
    symbol.innerHTML = `<i class="fas fa-temperature-high"></i>`;
  } else {
    symbol.innerHTML = `<i class="fas fa-temperature-low"></i>`;
  }
}

//Current location button - fahrenheit
let fahrenheitCurrent = document.querySelector(`#fahrenheit`);
fahrenheitCurrent.addEventListener(`click`, geoLocF);

function geoLocF() {
  navigator.geolocation.getCurrentPosition(showMyLocationF);
}

function showMyLocationF(position) {
  let apiKey = `5823f95be100eb78af18e8efbba8c1c5`;
  let units = `imperial`;

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showMyTempF);
}
function showMyTempF(response) {
  let temp = Math.round(response.data.main.temp);
  let weatherDisplay = document.querySelector(`#current-degrees`);
  weatherDisplay.innerHTML = `${temp}`;

  let weatherInfo = document.querySelector(`#weather-info`);
  weatherInfo.innerHTML = `Humidity: ${response.data.main.humidity} lbs/ft<sup>3</sup> <br/> Wind Speed: ${response.data.wind.speed} mph`;
}
