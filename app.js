"use strict";

const cityName = document.querySelector(".weather_city");
const dateTime = document.querySelector(".weather_datetime");
const w_forecast = document.querySelector(".weather_forecast");
const w_icon = document.querySelector(".weather_icon");
const w_temperature = document.querySelector(".weather_temperature");
const w_minTemp = document.querySelector(".weather_min");
const w_maxTemp = document.querySelector(".weather_max");

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

// Get the weather data from the API
const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=jaipur&appid=0168229ebbc1341804403234f44f2a80`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const { main, name, weather, wind, sys, dt } = data;

    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
  } catch (err) {
    console.log(err);
  }
};

document.body.addEventListener("load", getWeather());
