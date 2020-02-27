/**
 * Weather Code Challenge
 *
 * This code challenge uses a jsonp callback function to display data from an external weather data source.
 *
 */

// This is our jsonp callback function. We'll call our populateCityData here so that we can display
// our content

const hdnWeatherJsonpCallback = data => {
  const body = document.getElementsByTagName("body")[0],
    cities = data.cities,
    citySelect = document.getElementById("city-select"),
    subheading = document.querySelector("h2"),
    current = document.getElementById("current"),
    currentTemp = current.querySelector(".current-temp"),
    currentCond = current.querySelector(".current-cond"),
    forecast = document.getElementById("forecast"),
    weekly = forecast.querySelector(".weekly-forecast");

  for (let city of cities) {
    const selectOption = document.createElement("option");

    selectOption.innerHTML = city.geoloc.city;
    citySelect.appendChild(selectOption);

    if (city.geoloc.city === "Palo Alto") {
      selectOption.setAttribute("selected", true);
      populateCityData(subheading, currentTemp, currentCond, city, weekly);
    }

    citySelect.addEventListener("change", function() {

      if (citySelect.value === city.geoloc.city) {
        selectOption.setAttribute("selected", true);

        if (weekly.innerHTML !== "") {
          weekly.innerHTML = "";
        }

        populateCityData(subheading, currentTemp, currentCond, city, weekly);
      }
    });
  }
};

// This function will grab the jsonp data. We need this in two locations so we'll create a function for it.

const populateCityData = (subheading, temp, condition, city, week) => {
  subheading.innerHTML = `${city.geoloc.city} - Current Conditions: `;

  temp.innerHTML = `${city.current[0].temp}&#176;`;
  condition.innerHTML = `${city.current[0].condition}`;

  for (let day of city.weekly) {
    let weeklyListItem = document.createElement("li"),
      dayOfTheWeekContainer = document.createElement("div"),
      dayOfTheWeekTitle = document.createElement("h4"),
      high = document.createElement("h5"),
      low = document.createElement("h5"),
      dayOfTheWeekConditions = document.createElement("p");

    dayOfTheWeekContainer.className = "day";
    dayOfTheWeekTitle.innerHTML = `${day.day} ${day.date}`;
    high.innerHTML = `${day.high}&#176;`;
    low.innerHTML = `${day.low}&#176;`;
    dayOfTheWeekConditions.innerHTML = `${day.daycondition}`;

    dayOfTheWeekContainer.appendChild(dayOfTheWeekTitle);
    dayOfTheWeekContainer.appendChild(high);
    dayOfTheWeekContainer.appendChild(low);
    dayOfTheWeekContainer.appendChild(dayOfTheWeekConditions);

    weeklyListItem.appendChild(dayOfTheWeekContainer);
    week.appendChild(weeklyListItem);
  }
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
