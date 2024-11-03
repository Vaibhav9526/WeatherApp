// API KEY ="40912be1499980a4e22d60c80e398463"
// Animation complete event listener
  document.getElementById("lottieAnimation").addEventListener("complete", function() {
    // Loader ko hide karo aur content ko show karo jab animation complete ho jaye
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".content").style.display = "block";
});

// api work below

const apikey="40912be1499980a4e22d60c80e398463";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// searchbox is just a constant not a class
// searchbtn is just a constant not a class
// weathericon is just a constant not a class

const searchbox= document.querySelector(".search input");   
const searchbtn= document.querySelector(".search button");
const weathericon= document.querySelector(".weather-icon");

// in async function you have to pass a paramater

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    
    //agar me spelling galat dala to if run hoga or bolega ki invalid city name likha hai mere bhai
   
    if(response.status == 404){
        
        document.querySelector(".error").style.display ="block";
    
    }
    // nahi to me agar sahi spelling dala toh run hojana niche ka sara code
    else{
        var data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
        
        if(data.weather[0].main == "Clouds"){
            weathericon.src = "assests/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weathericon.src = "assests/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weathericon.src = "assests/rain.png";
        }
        else if(data.weather[0].main == "Mist"){
            weathericon.src = "assests/mist.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weathericon.src = "assests/drizzle.png";
        }
        else if(data.weather[0].main == "Snow"){
            weathericon.src = "assests/snow.png";
        }
        else if(data.weather[0].main == "Haze"){
            weathericon.src = "assests/haze.png";
        }
        
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display ="none";
        
        console.log(data);
    }


}

searchbtn.addEventListener("click" , ()=>{
    checkweather(searchbox.value);
});