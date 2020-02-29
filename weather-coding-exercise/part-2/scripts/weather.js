/**
 * Weather Code Challenge
 *
 * This code challenge uses a jsonp callback function to retrieve data from an external weather data source.
 */

// This code will grab data within the cities object from our external source. We need this in two locations
// so we'll create a function for it.

const populateCityData = (subheading, temp, condition, city, week) => {

  // This takes care of the selected city's current weather conditions
  subheading.innerHTML = `${city.geoloc.city}`;
  temp.innerHTML = `${city.current[0].temp}&#176;F`;
  condition.innerHTML = `${city.current[0].condition}`;

  // Here we'll retrieve a city's weekly information from the cities object. We'll create some elements on the fly
  // to contain this data and add it to the DOM.
  for (let day of city.weekly) {
    let weeklyListItem = document.createElement("li"),
      dayOfTheWeekContainer = document.createElement("div"),
      dayOfTheWeekHeading = document.createElement("h4"),
      dayOfTheWeekLowHighHeading = document.createElement("h5"),
      dayOfTheWeekConditions = document.createElement("p");

    dayOfTheWeekContainer.className = "day";
    dayOfTheWeekHeading.innerHTML = `${day.day} ${day.date}`;
    dayOfTheWeekLowHighHeading.innerHTML = `${day.low}&#176;/${day.high}&#176;`;

    // Handle our daymode/darkmode needs
    const darkmode = document.querySelectorAll(".darkmode");
    let condition =
      darkmode.length === 0 ? day.daycondition : day.nightcondition;
    dayOfTheWeekConditions.innerHTML = condition;

    dayOfTheWeekContainer.appendChild(dayOfTheWeekHeading);
    dayOfTheWeekContainer.appendChild(dayOfTheWeekLowHighHeading);
    dayOfTheWeekContainer.appendChild(dayOfTheWeekConditions);

    weeklyListItem.appendChild(dayOfTheWeekContainer);
    week.appendChild(weeklyListItem);
  }
};

// Set some configurations for the date and time of day
const dateAndTimeConfig = (body, content) => {
  const date = new Date(),
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    },
    hour = date.getHours(),
    dateOfDate = date.getDate(),
    fullDateHeading = document.createElement("h3"),
    dayOfMonthHeadings = document.querySelectorAll("li .day h4"),
    thirdSubHeading = content.querySelectorAll("h3");

  if (hour >= 20 || hour <= 7) {
    body.classList.add("darkmode");
  }

  // Add the full date to the DOM. We'll also use the toLocaleDateString method in order to convert our date to
  // long format.
  fullDateHeading.className = "full-date";
  fullDateHeading.innerHTML = date.toLocaleDateString("en-US", options);

  // Count number of h3 headings. If we have only 1, add the full date h3 heading to the DOM.
  if (thirdSubHeading.length === 1) {
    content.insertBefore(fullDateHeading, content.querySelector("#current"));
  }

  // We need to match today's day of the month with the day of the month within the weekly weather conditions
  // so that we can style the current day differently than the other days.
  const currentDayOfMonth = fullDateHeading.innerText
    .split(",")[1]
    .split(" ")[2];

  for (let day of dayOfMonthHeadings) {
    if (currentDayOfMonth === day.innerText.split(" ")[2]) {
      day.parentNode.parentNode.classList.add("today");
    }
  }
};

// This is our jsonp callback function. We'll call our populateCityData here so that we can display data
// from the cities object. We'll also call dateAndTimeConfig so that we can make configurations around the date and time.

const hdnWeatherJsonpCallback = data => {
  const cities = data.cities,
    body = document.getElementsByTagName("body")[0],
    citySelect = document.getElementById("city-select"),
    subheading = document.querySelector("h2"),
    current = document.getElementById("current"),
    currentTemp = current.querySelector(".current-temp"),
    currentCond = current.querySelector(".current-cond"),
    content = document.getElementById("content"),    
    weeklyForecast = content.querySelector(".weekly-forecast");

  // loop through the cities object to get data for each city
  for (let city of cities) {
    const selectOption = document.createElement("option");

    selectOption.innerHTML = city.geoloc.city;
    selectOption.value = city.geoloc.city;
    citySelect.appendChild(selectOption);

    // Sets up our first city to be Palo Alto
    if (city.geoloc.city === "Palo Alto") {
      selectOption.selected = "selected";
      populateCityData(
        subheading,
        currentTemp,
        currentCond,
        city,
        weeklyForecast
      );
    }
    dateAndTimeConfig(body, content);

    // We'll need to check if a user selects a new city so we can add an event listener for that
    citySelect.addEventListener("change", function() {
      if (citySelect.value === city.geoloc.city) {
        // selectOption.selected = "selected";

        // Check if the data is already populated. If it is, empty it out so we can populate another city's data when a user
        // selects another city
        if (weeklyForecast.innerHTML !== "") {
          weeklyForecast.innerHTML = "";
        }
        populateCityData(
          subheading,
          currentTemp,
          currentCond,
          city,
          weeklyForecast
        );
        dateAndTimeConfig(body, content);
      }
    });
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
