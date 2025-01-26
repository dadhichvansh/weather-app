"use strict";

const cityName = document.querySelector(".weather_city");
const dateTime = document.querySelector(".weather_datetime");

const w_forecast = document.querySelector(".weather_forecast");
const w_icon = document.querySelector(".weather_icon");
const w_temperature = document.querySelector(".weather_temperature");
const w_minTemp = document.querySelector(".weather_min");
const w_maxTemp = document.querySelector(".weather_max");

const w_feelsLike = document.querySelector(".weather_feelslike");
const w_humidity = document.querySelector(".weather_humidity");
const w_wind = document.querySelector(".weather_wind");
const w_pressure = document.querySelector(".weather_pressure");

const citySearch = document.querySelector(".weather_search");

let city = "jaipur";

// Get the country name from the country code
const getCountryName = (countryCode) => {
  return new Intl.DisplayNames([countryCode], { type: "region" }).of(
    countryCode
  );
};

// Get the current date and time
const getDateTime = (dt) => {
  const date = new Date(dt * 1000); // Convert the seconds to milliseconds

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};

// Get the city name from the user
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const cityName = document.querySelector(".city_name");
  city = cityName.value;

  getWeather();
  citySearch.reset();
});

// Get the weather data from the API
const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0168229ebbc1341804403234f44f2a80`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    w_temperature.innerHTML = `${main.temp}&#176`;
    w_minTemp.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
    w_maxTemp.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed()}&#176`;
    w_humidity.innerHTML = `${main.humidity.toFixed()}%`;
    w_wind.innerHTML = `${wind.speed.toFixed()} m/s`;
    w_pressure.innerHTML = `${main.pressure.toFixed()} hPa`;
  } catch (err) {
    console.log(err);
  }
};

document.body.addEventListener("load", getWeather());
