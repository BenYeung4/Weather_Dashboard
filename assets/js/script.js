//api key storage
var apiKey = "&appid=755c65e42d689835b8fd27ff1e21603c"

var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");

//enter city
var formSumbitHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({ city });
        cityInputEl.value = "";
    } else {
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

//save to local repositoy
var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

//retrieving the api with the city that we entered
var getCityWeather = function (city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

//display the api containers and push the lat and lon to the the UV
var displayWeather = function (weather, searchCity) {
    //clear old content
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    //create date element
    var currentDate = document.createElement("span")
    currentDate.textContent = " " + moment(weather.dt.value).format("- MMMM Do, YYYY" + "");

    //create an image element
    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    //create a span element for temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item"

    //create a span element for Humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item"

    //create a span element for Wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item"

    //append, display the content
    citySearchInputEl.appendChild(weatherIcon);
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon)
}

var getUvIndex = function (lat, lon) {
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?${apiKey}&lat=${lat}&lon=${lon}`
    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayUvIndex(data)
            });
        });
}

//displaying UV
var displayUvIndex = function (index) {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index: "
    uvIndexEl.classList = "list-group-item"

    uvIndexValue = document.createElement("span")
    uvIndexValue.textContent = index.value

    //append, display
    uvIndexEl.appendChild(uvIndexValue);
    weatherContainerEl.appendChild(uvIndexEl);
}

var get5Day = function (city) {

    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                display5Day(data);
            });
        });
};

//display five day forcast
var display5Day = function (weather) {
    forecastContainerEl.textContent = ""


    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];

        var forecastEl = document.createElement("div");
        forecastEl.classList = "card bg-primary text-light m-2";

        //create date element
        var forecastDate = document.createElement("h5")
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
        forecastDate.classList = "card-header text-center"

        //create an image element
        var weatherIcon = document.createElement("img")
        weatherIcon.classList = "card-body text-center";
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);

        //create temperature span
        var forecastTempEl = document.createElement("span");
        forecastTempEl.classList = "card-body text-center";
        forecastTempEl.textContent = "Temp " + dailyForecast.main.temp + " °F";

        //create humidity span
        var forecastHumEl = document.createElement("span");
        forecastHumEl.classList = "card-body text-center";
        forecastHumEl.textContent = "Humidity " + dailyForecast.main.humidity + "  %";
        
        //create wind span
        var forecastWindEl = document.createElement("span");
        forecastWindEl.classList = "card-body text-center"
        forecastWindEl.textContent = "Wind Speed: " + dailyForecast.wind.speed + " MPH";

        //display forecast details
        forecastEl.appendChild(forecastDate);
        forecastEl.appendChild(weatherIcon);
        forecastEl.appendChild(forecastTempEl);
        forecastEl.appendChild(forecastHumEl);
        forecastEl.appendChild(forecastWindEl);
        forecastContainerEl.appendChild(forecastEl);
    }

}

//pull from local repository
var pastSearch = function (pastSearch) {

    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city", pastSearch)
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
}

var pastSearchHandler = function (event) {
    var city = event.target.getAttribute("data-city")
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);