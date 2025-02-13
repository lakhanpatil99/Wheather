const apiKey = '0ca97a8469c34136bd6131530251302'; // Your WeatherAPI key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const lackinfoBtn = document.createElement('button');
lackinfoBtn.innerText = 'Visit lackinfo.com';
lackinfoBtn.id = 'lackinfo-btn';
lackinfoBtn.style.marginTop = '10px';
lackinfoBtn.style.padding = '10px 15px';
lackinfoBtn.style.backgroundColor = '#007bff';
lackinfoBtn.style.color = '#fff';
lackinfoBtn.style.border = 'none';
lackinfoBtn.style.borderRadius = '5px';
lackinfoBtn.style.cursor = 'pointer';

lackinfoBtn.addEventListener('click', () => {
    window.location.href = 'https://lackinfo.com';
});

// Append the button inside the container (below the weather search section)
const container = document.querySelector('.container');
container.appendChild(lackinfoBtn);
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeatherData(city) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.error) {
            weatherInfo.innerHTML = `<p>${data.error.message}</p>`;
        } else {
            displayWeather(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
    }
}

function displayWeather(data) {
    const { location, current } = data;
    const { name, region, country } = location;
    const { temp_c, condition } = current;
    const { text, icon } = condition;

    weatherInfo.innerHTML = `
        <h2>${name}, ${region}, ${country}</h2>
        <p>Temperature: ${temp_c}°C</p>
        <p>Weather: ${text}</p>
        <img src="${icon}" alt="${text}">
    `;
}