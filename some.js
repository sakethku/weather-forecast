//Complete the Weather API Backend part using openweathermap api
const api = {
    key: "60d12fbfc177682cc8618da9c4c33ee2",
    base: "https://api.openweathermap.org/data/2.5/"
  };
  
  const searchbox = document.querySelector(".search-box");
  searchbox.addEventListener("keypress", setQuery);
  

  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((weather) => {

        if(!weather.ok){
            alert("No weather found!");
            throw new Error("No weather found.");
        }
        return weather.json();
      })
      .then(displayResults);
  }
  
  function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
  }
  
  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day}, ${date}, ${month}, ${year}`;
  }