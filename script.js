// API KEY ="40912be1499980a4e22d60c80e398463"
// Animation complete event listener
document
  .getElementById("lottieAnimation")
  .addEventListener("complete", function () {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".content").style.display = "block";
  });

// api work below

const apikey = "40912be1499980a4e22d60c80e398463";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (response.status == 400) {
    alert("PLEASE ENTER CITY NAME");
  } else {
    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      alert("INVALID CITY NAME");
      console.log("invalid city name");
    } else {
      var data = await response.json();
      document.querySelector(".weathername").innerHTML =
        data.weather[0].main + " (" + data.weather[0].description + ")";

      if (data.sys.country == null) {
        document.querySelector(".city").innerHTML = data.name;
      } else {
        document.querySelector(".city").innerHTML =
          data.name + "  (" + data.sys.country + ")";
      }

      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
      document.querySelector(".owm").href =
        "https://openweathermap.org/city/" + data.id;

      if (data.weather[0].main == "Clouds") {
        weathericon.src = "assests/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weathericon.src = "assests/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weathericon.src = "assests/rain.png";
      } else if (data.weather[0].main == "Mist") {
        weathericon.src = "assests/mist.png";
      } else if (data.weather[0].main == "Drizzle") {
        weathericon.src = "assests/drizzle.png";
      } else if (data.weather[0].main == "Snow") {
        weathericon.src = "assests/snow.png";
      } else if (data.weather[0].main == "Haze") {
        weathericon.src = "assests/haze.png";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
      document.querySelector(".blink").style.display = "none";

      console.log('JS BY VAIBHAV SHARMA');
      console.log(data);
    }
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});


searchbox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkweather(searchbox.value);
  }
});
