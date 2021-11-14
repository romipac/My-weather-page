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
  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}ºc`;
  let tempDescription = document.querySelector("#weather-now");
  tempDescription.innerHTML = response.data.weather[0].main;
  let maxDegrees = document.querySelector("#maximum");
  maxDegrees.innerHTML = `${Math.round(response.data.main.temp_max)}ºc`;
  let minDegrees = document.querySelector("#minimum");
  minDegrees.innerHTML = `${Math.round(response.data.main.temp_min)}ºc`;
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
