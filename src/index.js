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

  let nextDay = document.querySelector(".nextDay");
  nextDay.innerHTML = abrvWeekDays[(current.getDay() + 1) % 7];

  let twoDays = document.querySelector(".twoDays");
  twoDays.innerHTML = abrvWeekDays[(current.getDay() + 2) % 7];

  let threeDays = document.querySelector(".threeDays");
  threeDays.innerHTML = abrvWeekDays[(current.getDay() + 3) % 7];

  let fourDays = document.querySelector(".fourDays");
  fourDays.innerHTML = abrvWeekDays[(current.getDay() + 4) % 7];

  let fiveDays = document.querySelector(".fiveDays");
  fiveDays.innerHTML = abrvWeekDays[(current.getDay() + 5) % 7];

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
    let cel = Math.round(((currentTemp - 32) * 5) / 9);
    degCel.innerHTML = cel;

    //Switching temp from C to F
    function tempSwitchCtoF(event) {
      let degFar = document.querySelector(".temp-now");
      let far = Math.round((cel * 9) / 5 + 32);
      degFar.innerHTML = far;
    }

    let CtoF = document.querySelector(".farenheit");
    CtoF.addEventListener("click", tempSwitchCtoF);
  }

  console.log(response);
}

function myLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "7f2bcb3fa67c76b6d051afd4ec0b0d33";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(weatherFunction);
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
let abrvWeekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
todayDate(new Date());

//Search for the city
let topSearch = document.querySelector("#search-top");
topSearch.addEventListener("submit", changeCity);

findMyLocation();
