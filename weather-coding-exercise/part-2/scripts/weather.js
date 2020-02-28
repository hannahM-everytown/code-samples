/**
 * Weather Code Challenge
 *
 * This code challenge uses a jsonp callback function to retrieve data from an external weather data source.
 *
 */

// This is our jsonp callback function. We'll call our populateCityData here so that we can display data from the 
// source's cities object.

const hdnWeatherJsonpCallback = data => {

  const body = document.getElementsByTagName("body")[0],
    cities = data.cities,
    citySelect = document.getElementById("city-select"),
    subheading = document.querySelector("h2"),
    current = document.getElementById("current"),
    currentTemp = current.querySelector(".current-temp"),
    currentCond = current.querySelector(".current-cond"),
    forecast = document.getElementById("forecast"),
    weeklyForecast = forecast.querySelector(".weekly-forecast");

  // Get the hour of the day so we can check if we need to add darkmode
  getHourOfDay(body);  

  // loop through our object to get data for each city
  for (let city of cities) {
    const selectOption = document.createElement("option");

    selectOption.innerHTML = city.geoloc.city;
    citySelect.appendChild(selectOption);

    if (city.geoloc.city === "Palo Alto") {
      selectOption.setAttribute("selected", true);
      populateCityData(subheading, currentTemp, currentCond, city, weeklyForecast);
    }

   // We'll need to check if a user selects a new city so we can add an event listener for that 
    citySelect.addEventListener("change", function() {
      if (citySelect.value === city.geoloc.city) {
        selectOption.setAttribute("selected", true);

        // Check if the data is already populated. If it is, empty it out so we can populate another city's data if a user 
        // selects another city
        if (weeklyForecast.innerHTML !== "") {
          weeklyForecast.innerHTML = "";
        }
        populateCityData(subheading, currentTemp, currentCond, city, weeklyForecast);
      }
    });
  }
};

// This function will grab the jsonp data. We need this in two locations so we'll create a function for it.

const populateCityData = (subheading, temp, condition, city, week) => {

  // This takes care of the selected city's current conditions
  subheading.innerHTML = `${city.geoloc.city}`;
  temp.innerHTML = `${city.current[0].temp}&#176;`;
  condition.innerHTML = `${city.current[0].condition}`;

  // Here we'll retrieve a city's weekly information from the cities object
  for (let day of city.weekly) {
    let weeklyListItem = document.createElement("li"),
      dayOfTheWeekContainer = document.createElement("div"),
      dayOfTheWeekTitle = document.createElement("h4"),
      lowHigh = document.createElement("h5"),
      dayOfTheWeekConditions = document.createElement("p");

    dayOfTheWeekContainer.className = "day";
    dayOfTheWeekTitle.innerHTML = `${day.day} ${day.date}`;
    lowHigh.innerHTML = `${day.low}&#176;/${day.high}&#176;`;

    // Handle our daymode/darkmode needs
    const darkmode = document.querySelectorAll(".darkmode");
    let condition = darkmode.length === 0 ? day.daycondition : day.nightcondition;
    dayOfTheWeekConditions.innerHTML = condition;

    dayOfTheWeekContainer.appendChild(dayOfTheWeekTitle);
    dayOfTheWeekContainer.appendChild(lowHigh);
    dayOfTheWeekContainer.appendChild(dayOfTheWeekConditions);

    weeklyListItem.appendChild(dayOfTheWeekContainer);
    week.appendChild(weeklyListItem);
  }
};

// Get the hour of the day so we can setup styling on the class darkmode 
const getHourOfDay = (body) => {
  const date = new Date(),
    hours = date.getHours();
  
  if (hours >= 20 || hours < 7) {
    body.classList.add("darkmode");
  }
  return hours;
};

// Here we'll create a script tag for the jsonp source so we can use the callback function to access the data
// We're also adding our Google font to the head element.

const addScriptsToHead = () => {
  const head = document.getElementsByTagName("head")[0],
    script = document.createElement("script"),
    url =
      "https://www.sfchronicle.com/external/weather/weather.json?callback=hdnWeatherJsonpCallback";

  sourceSansProFont = document.createElement("link");
  sourceSansProFont.href =
    "https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap";
  sourceSansProFont.rel = "stylesheet";
  script.src = url;

  head.appendChild(sourceSansProFont);
  head.appendChild(script);
};

// Initialize

const init = () => {
  addScriptsToHead();
};

init();
