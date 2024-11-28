const PreLoader = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    PreLoader.style.display = "none";
  }, 3500);
});

const apikey = "40912be1499980a4e22d60c80e398463";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (response.status == 400 || response.status == 404) {
    document.querySelector(".error").style.display = "block";
    alert("INVALID CITY NAME");
  } else {
    var data = await response.json();

      document.querySelector(".weathername").innerHTML = data.weather[0].main + " (" + data.weather[0].description + ")";
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
      document.querySelector(".owm").href = "https://openweathermap.org/city/" + data.id;

    var WeatherType = data.weather[0].main;
    weathericon.src = `assests/${WeatherType}.png`;

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
      document.querySelector(".blink").style.display = "none";
      // console.log(data);
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});

searchbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkweather(searchbox.value);
  }
});
