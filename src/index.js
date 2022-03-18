let apiKey = "cdf98f863d0378b05835909b54fe3a4c";

let dateElement = document.querySelector("#now");
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let date = currentTime.getDate();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
dateElement.innerHTML = `${day} ${date}, ${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-display");
  let cityImput = document.querySelector("#city-search-input");
  cityElement.innerHTML = cityImput.value;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row align-items-start">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 3) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${days[new Date(forecastDay.dt).getDay()]}</h5>
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" class="card-img-bottom" alt="...">
        <p class="card-text"> <span class="weather-forecast-min"> ${Math.round(
          forecastDay.temp.min
        )} ºC </span> -<span class="weather-forecast-max"> ${Math.round(
          forecastDay.temp.max
        )}</span> ºc </p>  
      </div>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `<div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cdf98f863d0378b05835909b54fe3a4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&untis=metric`;
  console.log(apiUrl), axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", searchCity);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search-input");
  let city = searchInput.value;
  let apiKey = "cdf98f863d0378b05835909b54fe3a4c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response);
  let heading = document.querySelector("h1");
  heading.innerHTML = `${response.data.name}`;
  let currentTemp = document.querySelector("#tempeture-now");
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  let tempDescription = document.querySelector("#weather-now");

  CelciusTemperature = response.data.main.temp;

  tempDescription.innerHTML = response.data.weather[0].main;
  let maxDegrees = document.querySelector("#maximum");
  maxDegrees.innerHTML = `${Math.round(response.data.main.temp_max)}`;
  let minDegrees = document.querySelector("#minimum");
  minDegrees.innerHTML = `${Math.round(response.data.main.temp_min)}`;
  let WindElement = document.querySelector("#wind");
  WindElement.innerHTML = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "cdf98f863d0378b05835909b54fe3a4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchLocation(position) {
  let apiKey = "cdf98f863d0378b05835909b54fe3a4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempeture-now");
  let farenheitTemperature = (CelciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempeture-now");
  temperatureElement.innerHTML = Math.round(CelciusTemperature);
}

let CelciusTemperature = null;

let farenheitUnit = document.querySelector("#farenheit-unit");
farenheitUnit.addEventListener("click", displayFarenheitTemperature);

let celsiusUnit = document.querySelector("#deg-celcius");
celsiusUnit.addEventListener("click", displayCelsiusTemperature);

search("Paris");
