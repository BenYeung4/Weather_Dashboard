# Weather_Dashboard
GIVEN a weather dashboard with form inputs

![Homepage](https://user-images.githubusercontent.com/52897163/170846905-17260f1d-e6c0-409d-b8ec-a2e2214efbfc.JPG)



WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history


Used the weather API to search for the city, while providing the details of the temperature, humidity, wind speed, and UV index.

//retrieving the api with the city that we entered
var CityWeather = function (city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial${apiKey}`;

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

but for the UV index, I had to use a second api with this detail

the lat and lon were pulled from the previous api, this way we can just plug it back into the new one.

`https://api.openweathermap.org/data/2.5/uvi?${apiKey}&lat=${lat}&lon=${lon}`;


WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

//display the api containers and push the lat and lon to the the UV
var displayWeather = function (weather, searchCity) {
    //clear old content
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    //create date element
    var currentDate = document.createElement("span");
    currentDate.textContent = " " + moment(weather.dt.value).format("- MMMM Do, YYYY" + "");

    //create an image element
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);

    //create a span element for temperature data
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item";

    //create a span element for Humidity data
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item";

    //create a span element for Wind data
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";

    //append, display the content
    citySearchInputEl.appendChild(currentDate);
    citySearchInputEl.appendChild(weatherIcon);
    weatherContainerEl.appendChild(temperatureEl);
    weatherContainerEl.appendChild(humidityEl);
    weatherContainerEl.appendChild(windSpeedEl);


![Current Day](https://user-images.githubusercontent.com/52897163/170846915-584cd6b6-e5bc-473e-bd21-e6e47b20c21f.JPG)



WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe


Used an if else statement to help with the color indicator.

    if(index.value <=2){
        uvIndexValue.classList = "favorable"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate "
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe"
    };



WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

This one was a bit difficult, I wanted to use the same format as my current day weather but it was easier to just recreate it and use a function to loop it.

![Week Forecast](https://user-images.githubusercontent.com/52897163/170847023-67cab8e9-ec45-4707-905b-0f4e1a30d5fb.JPG)




WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

![Storage](https://user-images.githubusercontent.com/52897163/170847026-810ba1df-0f79-49b5-ab34-04170444bfc3.JPG)


All the cities were stored in the local repository with the following:

<!--var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
}; -->

<!--var pastSearchHandler = function (event) {
    var city = event.target.getAttribute("data-city");
    if (city) {
        CityWeather(city);
        fiveDays(city);
    }
}>





<!--api website>
https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//api key storage
var apiKey = "&appid=755c65e42d689835b8fd27ff1e21603c"


var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=";


