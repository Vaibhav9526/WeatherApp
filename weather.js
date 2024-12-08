const PreLoader = document.querySelector(".loader");//preloader
const apikey = "40912be1499980a4e22d60c80e398463";//openweathermap api key
const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //weather api
const RevGeoAPI = "https://ipapi.co/json/"; //reverse geolocation api
const searchbox = document.querySelector(".search input");//search input
const searchbtn = document.querySelector(".search button");//search button
const weathericon = document.querySelector(".weather-icon");//weather icon

//function to check the weather
async function checkweather(city) {
    //Fetching weather data
    const response = await fetch(apiurl + city + `&appid=${apikey}`);  
    searchbox.value = city;
    if (response.status == '' || response.status == 404 || response.status == 400) {
    document.querySelector(".error").style.display = "block";
    alert("INVALID CITY NAME");
  } else {
    var data = await response.json();
    //displaying the weather data
    document.querySelector(".weathername").innerHTML = data.weather[0].main + " (" + data.weather[0].description + ")";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
    document.querySelector(".owm").href = "https://openweathermap.org/city/" + data.id;
    //displaying the weather icon
    var WeatherType = data.weather[0].main;
    weathericon.src = `assests/${WeatherType}.png`;
    //displaying the card
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".blink").style.display = "none";
    }
}
window.addEventListener("load", async () => {
  setTimeout(() => {
    PreLoader.style.display = "none";
  }, 3500);
  //(it will use the ip address to get the city name by Reverse geolocating)
  const responseREV = await fetch(RevGeoAPI);
  const dataREV = await responseREV.json();
  var defCity = dataREV.city;
  checkweather(defCity);
});
searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});

searchbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkweather(searchbox.value);
  }
});