const PreLoader = document.querySelector(".loader");//preloader
const apikey = "40912be1499980a4e22d60c80e398463";//openweathermap api key
const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //weather api
const ICONapi = "https://openweathermap.org/img/wn/"; //ICONS API
const RevGeoAPI = "https://ipapi.co/json/"; //reverse geolocation api
const searchbox = document.querySelector(".search input");//search input
const searchbtn = document.querySelector(".search button");//search button
const loadingSpinner = document.querySelector(".SpinLoader");//loading spinner
const weathericon = document.querySelector(".weather-icon");//weather icon

//function to check the weather
async function checkweather(city) {
    loadingSpinner.style.display = "block"; //loading spinner on city reloads
    const response = await fetch(apiurl + city + `&appid=${apikey}`); //Fetching weather data
    searchbox.value = city; //search input value for default city (IP address city)
    if (response.status == '' || response.status == 404 || response.status == 400) { //error handling
      document.querySelector(".error").style.display = "block";
      loadingSpinner.style.display = "none";
      document.querySelector(".weather").style.display = "none";
    } else {
    var data = await response.json();//fetching data
    
    // Fetch AQI data using coordinates from weather data
    const aqiResponse = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apikey}`);
    const aqiData = await aqiResponse.json();
    const aqiMap = {    // Map AQI values to descriptive text
        1: "Good",
        2: "Fair", 
        3: "Moderate",
        4: "Poor",
        5: "Very Poor"
    };

    document.querySelector(".weathername").innerHTML = data.weather[0].main + " (" + data.weather[0].description + ")"; //weather name
    document.querySelector(".city").innerHTML = data.name; //city name
    document.querySelector(".country-flag").src = `https://flagcdn.com/${data.sys.country.toLowerCase()}.svg`; //country flag
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; //temperature
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; //humidity
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h"; //wind speed
    document.querySelector(".max-temp").innerHTML = Math.round(data.main.temp_max) + "°C"; //max temperature
    document.querySelector(".min-temp").innerHTML = Math.round(data.main.temp_min) + "°C"; //min temperature
    document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });//sunrise time
    document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });//sunset time
    document.querySelector(".visibility").innerHTML = data.visibility/1000 + "km"; //visibility
    document.querySelector(".aqi").innerHTML = aqiMap[aqiData.list[0].main.aqi];//air quality
    
    weathericon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png `; //weather icon from openweathermap
    
    //displaying the card
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    loadingSpinner.style.display = "none";
    }
}

window.addEventListener("load", async () => {//onload preloader and Default location
  setTimeout(() => {
    PreLoader.style.display = "none";
  }, 3000);
  const responseREV = await fetch(RevGeoAPI);//(it will use the ip address to get the city name by Reverse geolocating)
  const dataREV = await responseREV.json();
  var defCity = dataREV.city;
  checkweather(defCity);
});
searchbtn.addEventListener("click", () => { //search button click event
  checkweather(searchbox.value);
});

searchbox.addEventListener("keypress", (e) => { //search input keypress event
  if (e.key === "Enter") {
    checkweather(searchbox.value);
  }
});