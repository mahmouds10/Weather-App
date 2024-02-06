let currentCity = "";
let foreCast = [{}];
let yesterdayForeCast = [{}];
const img = document.getElementById("weatherIcon");
const city = document.getElementById("city");
async function getCurrentCity() {
  const request = await fetch("https://ipinfo.io/json?token=688adbd185d3f4");
  const jsonResponse = await request.json();
  currentCity = jsonResponse.city;
  document.getElementById("city").innerHTML = currentCity;
}

async function getForecast(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=806cba55746b4b4e8a8121836240102&q=${city}&days=2&aqi=no&alerts=no`
  );
  foreCast = await response.json();
  img.src = foreCast.forecast.forecastday[0].day.condition.icon;
  document.getElementById("temp").innerHTML = foreCast.current.temp_c + "°";
  document.getElementById("time").innerHTML = foreCast.location.localtime;
  document.getElementById("today_maxTmp").innerHTML =
    foreCast.forecast.forecastday[0].day.maxtemp_c + "°";
  document.getElementById("today_minTmp").innerHTML =
    foreCast.forecast.forecastday[0].day.mintemp_c + "°";
  document.getElementById("toady_sunrise").innerHTML =
    foreCast.forecast.forecastday[0].astro.sunrise;
  document.getElementById("today_sunset").innerHTML =
    foreCast.forecast.forecastday[0].astro.sunset;
  document.getElementById("today_wind").innerHTML =
    foreCast.forecast.forecastday[0].day.maxwind_kph + "Km/h";
  document.getElementById("today_status").innerHTML =
    foreCast.forecast.forecastday[0].day.condition.text;
  document.getElementById("tomorrw_maxTmp").innerHTML =
    foreCast.forecast.forecastday[1].day.maxtemp_c + "°";
  document.getElementById("tomorrow_minTmp").innerHTML =
    foreCast.forecast.forecastday[1].day.mintemp_c + "°";
  document.getElementById("tomorrow_sunrise").innerHTML =
    foreCast.forecast.forecastday[1].astro.sunrise;
  document.getElementById("tomorrow_sunset").innerHTML =
    foreCast.forecast.forecastday[1].astro.sunset;
  document.getElementById("tomorrow_wind").innerHTML =
    foreCast.forecast.forecastday[1].day.maxwind_kph + "Km/h";
  document.getElementById("tomorrow_icon").src =
    foreCast.forecast.forecastday[1].day.condition.icon;
  document.getElementById("tomorrow_status").innerHTML =
    foreCast.forecast.forecastday[1].day.condition.text;
}

function getYesterdayDate() {
  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  let formattedDate = yesterday.toISOString().split("T")[0];
  return formattedDate;
}
let yesterdayDate = getYesterdayDate();
async function getYeserdayWeather(city) {
  const response =
    await fetch(`https://api.weatherapi.com/v1/history.json?key=806cba55746b4b4e8a8121836240102&q=${city}&dt=${yesterdayDate}&
  `);
  yesterdayForeCast = await response.json();
  console.log(yesterdayForeCast);
  document.getElementById("y_maxTmp").innerHTML =
    yesterdayForeCast.forecast.forecastday[0].day.maxtemp_c + "°";
  document.getElementById("y_minTmp").innerHTML =
    yesterdayForeCast.forecast.forecastday[0].day.mintemp_c + "°";
  document.getElementById("y_sunrise").innerHTML =
    yesterdayForeCast.forecast.forecastday[0].astro.sunrise;
  document.getElementById("y_sunset").innerHTML =
    yesterdayForeCast.forecast.forecastday[0].astro.sunset;
  document.getElementById("y_wind").innerHTML =
    yesterdayForeCast.forecast.forecastday[0].day.maxwind_kph + "Km/h";
  document.getElementById("y_icon").src =
    yesterdayForeCast.forecast.forecastday[0].day.condition.icon;
  document.getElementById("y_status").innerHTML =
    yesterdayForeCast.forecast.forecastday[0].day.condition.text;
}

async function call(city) {
  await getForecast(city);
  await getYeserdayWeather(city);
}

window.addEventListener("load", async function () {
  await getCurrentCity();
  call(currentCity);
});

document.getElementById("resetLocation").addEventListener("click", async () => {
  await getCurrentCity();
  call(currentCity);
});

document.getElementById("searchBtn").addEventListener("click", () => {
  call(searchInput.value);
  document.getElementById("city").innerHTML = searchInput.value;
  searchInput.value = "";
});
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  if (e.key == "Enter" && searchInput.value != null) {
    call(searchInput.value);
    document.getElementById("city").innerHTML = searchInput.value;
    searchInput.value = "";
  }
});
