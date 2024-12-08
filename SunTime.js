const PreLoader = document.querySelector(".loader"); //preloader
const apikey = "40912be1499980a4e22d60c80e398463"; //openweathermap api key
const LocAPI = "https://api.openweathermap.org/geo/1.0/direct?q="; //location api  
const RevGeoAPI = "https://ipapi.co/json/"; //reverse geolocation api
const TimeAPI = "https://api.sunrisesunset.io/json"; //sunrise sunset api
const searchbox = document.querySelector(".sunInput"); //search input
const searchbtn = document.querySelector(".sunBtn"); //search button
const sunrise = document.querySelector(".sunrise-time"); //sunrise time
const sunset = document.querySelector(".sunset-time"); //sunset time

let defLat, defLng; //default latitude and longitude

async function SunTime(city) {
    //location api
    searchbox.value = city;
    const responseLOC = await fetch(LocAPI + city + `&appid=${apikey}`);
    var dataLOC = await responseLOC.json();
    
    if (dataLOC.length === 0) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".results").style.display = "none";
        return;
    }
    var lat = dataLOC[0].lat;
    var lng = dataLOC[0].lon;
    //sunrise and sunset
    const responseTIME = await fetch(TimeAPI + `?lat=${lat}&lng=${lng}`);
    const dataTIME = await responseTIME.json();
    console.log(dataTIME);
    sunrise.innerHTML = dataTIME.results.sunrise;
    sunset.innerHTML = dataTIME.results.sunset;
    document.querySelector(".results").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
searchbtn.addEventListener("click", () => {
    if(searchbox.value == ''){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".results").style.display = "none";
        return;
    }else{
        SunTime(searchbox.value);
    }
})
searchbox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        if(searchbox.value == ''){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".results").style.display = "none";
            return;
        }else{
            SunTime(searchbox.value);
        }
    }
})
window.addEventListener("load", async () => {
    setTimeout(() => {
      PreLoader.style.display = "none";
    }, 3500);
    //(it will use the ip address to get the city name by Reverse geolocating)
    const responseREV = await fetch(RevGeoAPI);
    const dataREV = await responseREV.json();
    var defCity = dataREV.city;
    SunTime(defCity);
  });