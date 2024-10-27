const searchButton = document.querySelector("#btn");
const inputCity = document.querySelector("#city");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const nameCity = document.querySelector("#city-name");
const iconElement = document.querySelector("#weather-icon"); // Selecting the icon element

const BASEURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const APIKEY = "3084f13359ec709d3351a451bd092717";

searchButton.addEventListener("click", () => {
    console.log("BUTTON CLICKED");
    let city = inputCity.value.trim();
    console.log(city);
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        let URL = `${BASEURL}${city}&appid=${APIKEY}`;
        let response = await fetch(URL);
        if (!response.ok) throw new Error('City not found');
        
        let data = await response.json();
        console.log(data);
        
        // Update temperature, city name, humidity, and wind speed
        temp.innerText = `${Math.round(data.main.temp - 273.15)}°C`;
        nameCity.innerText = city;
        wind.innerText = `${data.wind.speed} km/h`;
        humidity.innerText = `${data.main.humidity}%`;
        
        // Set the weather icon based on data
        let iconCode = data.weather[0].icon; // Get icon code
        iconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Set icon URL
        iconElement.alt = data.weather[0].description; // Set alt text for accessibility
        iconElement.style.visibility = "visible";

        
    } catch (e) {
        console.error("Error fetching data:", e);
        alert("Could not fetch weather data. Please check the city name and try again.");
    }
}
