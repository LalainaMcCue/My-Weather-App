function todayDate(current) {
  let dateDisplay = document.querySelector(".date");
  let month = current.getMonth() + 1;
  dateDisplay.innerHTML =
    weekDays[current.getDay()] +
    " " +
    month +
    "/" +
    current.getDate() +
    "/" +
    current.getFullYear();
  let hours = current.getHours();
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let updateTime = document.querySelector(".update-time");
  updateTime.innerHTML = `Last updated ${month}/${current.getDate()}   ${hours}:${minutes}`;

  let greeting = document.querySelector(".greeting");
  if (current.getHours() < 12) {
    greeting.innerHTML = "Good Morning";
  } else if (current.getHours() >= 20) {
    greeting.innerHTML = "Good Night";
  } else if (current.getHours() >= 17) {
    greeting.innerHTML = "Good Evening";
  } else {
    greeting.innerHTML = "Good Afternoon";
  }
}

function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector(".search-bar");
  let newCity = document.querySelector(".city");
  newCity.innerHTML = searchCity.value;
  let apiKey = "7f2bcb3fa67c76b6d051afd4ec0b0d33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherFunction);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForcast);
}
//Go back to my city or location
let pinButton = document.querySelector(".myLocation-button");
pinButton.addEventListener("click", findMyLocation);

function weatherFunction(response) {
  //My City
  let myCity = response.data.name;
  let h1 = document.querySelector(".city");
  h1.innerHTML = myCity;

  //Weather Icon Description
  let description = document.querySelector(".today-icon-title");
  let iconTitle = response.data.weather[0].description;
  description.innerHTML = iconTitle;

  //My Current Temp
  let currentTemp = Math.round(response.data.main.temp);
  let myTemp = document.querySelector(".temp-now");
  myTemp.innerHTML = currentTemp;

  let FtoC = document.querySelector(".celcius");
  FtoC.addEventListener("click", tempSwitchFtoC);

  //Switching temp from F to C
  function tempSwitchFtoC(event) {
    let degCel = document.querySelector(".temp-now");
    let celMain = Math.round(((currentTemp - 32) * 5) / 9);
    let celHigh = Math.round(((high - 32) * 5) / 9);
    let celLow = Math.round(((low - 32) * 5) / 9);
    degCel.innerHTML = celMain;
    highTemp.innerHTML = celHigh;
    lowTemp.innerHTML = celLow;

    //Switching temp from C to F
    function tempSwitchCtoF(event) {
      let degFar = document.querySelector(".temp-now");
      let far = currentTemp;
      degFar.innerHTML = far;
      highTemp.innerHTML = high;
      lowTemp.innerHTML = low;
    }

    let CtoF = document.querySelector(".farenheit");
    CtoF.addEventListener("click", tempSwitchCtoF);
  }

  //High|Low
  let highTemp = document.querySelector(".high");
  let high = Math.round(response.data.main.temp_max);
  highTemp.innerHTML = high;
  let lowTemp = document.querySelector(".low");
  let low = Math.round(response.data.main.temp_min);
  lowTemp.innerHTML = low;

  //Wind speed
  let wind = document.querySelector(".windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = windSpeed;

  //Humidity
  let humid = document.querySelector(".humidity");
  let humidity = Math.round(response.data.main.humidity);
  humid.innerHTML = humidity;

  //icon
  let icon = document.querySelector(".icon");
  let iconCode = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`
  );

  console.log(response);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForcast(response) {
  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = null;
  let forcast = null;
  for (let index = 0; index < 5; index++) {
    forcast = response.data.list[index];

    forcastElement.innerHTML += `
      <div class="col-2 forcast-days">
        <p class="forcast-time">${formatHours(forcast.dt * 1000)}</p>
        <img src = "https://openweathermap.org/img/wn/${
          forcast.weather[0].icon
        }@2x.png" class="forcast-icon"/>
        <p class="high-low"><strong><span class="forcastHigh">${Math.round(
          forcast.main.temp_max
        )}</span></strong>  |  <span class="forcastLow">${Math.round(
      forcast.main.temp_min
    )}</span></p>
      </div>`;
  }
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "7f2bcb3fa67c76b6d051afd4ec0b0d33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherFunction);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForcast);
}

function findMyLocation() {
  navigator.geolocation.getCurrentPosition(myLocation);
}

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
todayDate(new Date());

//Search for the city
let topSearch = document.querySelector("#search-top");
topSearch.addEventListener("submit", changeCity);

findMyLocation();
