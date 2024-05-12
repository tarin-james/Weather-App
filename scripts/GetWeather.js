const urlParams = new URLSearchParams(window.location.search);
const latitude = urlParams.get("lat");
const longitude = urlParams.get("lon");
const weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=285efc0f634ad6cd8b48ebf5c49e75c9`;
const forecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=285efc0f634ad6cd8b48ebf5c49e75c9`;
const currentHigh = document.querySelector("#current-high-text");
const currentTemp = document.querySelector("#current-temp-text");
const currentHumidity = document.querySelector("#current-humidity");
const forecastTemp = document.querySelector("#forecast-temp");
const forecastHumidity = document.querySelector("#forecast-humidity");
const forcastContainer = document.querySelector("#forecast");
const currentWeatherContainer = document.querySelector('#current-weather-section');
const cityName = document.querySelector("#city");

getCurrentWeather(weatherurl).then((currentWeatherResponse) => {

  displayResults(currentWeatherResponse);
  getForecast(forecast).then((forecastResponse) => {
    displayForecast(forecastResponse);

  })

});
async function getCurrentWeather(weatherurl) {
    try {
      const response = await fetch(weatherurl);
      if (response.ok) {
        return await response.json();
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      return {};
    }
    
  }

  async function getForecast(forecast) {
    try {
        const response = await fetch(forecast);
        if (response.ok) {
        const data = await response.json();
        const filteredForecast = data.list
            .filter((report) => {
            return report.dt_txt.includes("15:00:00");
          })
            .splice(0, 1);
        return filteredForecast
        } else {
        throw Error(await response.text());
        }
    } catch (error) {
      return [];
    }
 
}

function displayForecast(filteredForecast) {
  filteredForecast?.forEach((day) => {
    const data = day;
    forecastTemp.innerHTML += `${data.main.temp}&deg;F`;
    forecastHumidity.innerHTML += `${data.main.humidity}%`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const forecastIcon = document.createElement('img');
    forecastIcon.src = iconsrc;
    forecastIcon.alt = 'Forecast Icon';
    forcastContainer.appendChild(forecastIcon);
  });

}

function displayResults(data) {
  cityName.textContent += data.name ? `${data.name}` : ''; 
  currentHigh.innerHTML += data.main?.temp_max ? `${data.main?.temp_max}&deg;F` : '';
  currentTemp.innerHTML += data.main?.temp ? `${data.main?.temp}&deg;F`: '';
  currentHumidity.innerHTML += data.main?.humidity ? `${data.main?.humidity}%` : '';
  const iconsrc = `https://openweathermap.org/img/w/${data.weather?.[0].icon}.png`;
  const currentIcon = document.createElement('img');
  currentIcon.src = iconsrc;
  currentIcon.alt = 'Current Weather Icon';
  currentWeatherContainer.appendChild(currentIcon);

}




