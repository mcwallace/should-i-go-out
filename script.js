// KEY IS e05c147cb6482135 for weather underground
// put attribution @ footer
// GET USER LOCATION via user prompt if mobile, ip address if desktop or mobile doesn't give permissions

// eventually this should be the result of a form, but now it's hardcoded to philly for testing
var zip = 19104;


//should eventually switch to a different api, if traffic increases
// http://openweathermap.org/appid  
// https://developer.forecast.io/
var api = "http://api.wunderground.com/api/e05c147cb6482135";
var today_weather, yesterday_weather, tomorrow_weather ; 

weather_list = getWeather(zip);
today_weather = weather_list[0];
yesterday_weather = weather_list[1];
tomorrow_weather = weather_list[2];

console.log(tomorrow_weather);
console.log(yesterday_weather);
console.log(today_weather);

var goOut = goOutToday(today_weather, yesterday_weather, tomorrow_weather);
var suggestion = document.getElementById("sugg_text");
suggestion.textContent = goOut;
populateWeather(today_weather, yesterday_weather, tomorrow_weather);




////////////////////////functions

function getWeather(zip) {
    console.log("getting weather");
    var today_request = api + "/conditions/q/" + zip + ",us.json";
    var yesterday_request = api + "/yesterday/q/" + zip + ",us.json";
    var tomorrow_request = api + "/forecast/q/" + zip + ",us.json";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", today_request, false);
    xhr.send();

    var yhr = new XMLHttpRequest();
    yhr.open("GET", yesterday_request, false);
    yhr.send();

    var thr = new XMLHttpRequest();
    thr.open("GET", tomorrow_request, false);
    thr.send()

    var today_weather = JSON.parse(xhr.response).current_observation;
    var yesterday_weather = JSON.parse(yhr.response).history.dailysummary[0];
    var tomorrow_weather = JSON.parse(thr.response).forecast.simpleforecast.forecastday[1];

    return [today_weather, yesterday_weather, tomorrow_weather]
}

function goOutToday(today, yesterday, tomorrow) {
    var this_date = new Date();
    var today_temp = today.temp_f;
    var yesterday_temp = parseInt(yesterday.meantempi);
    var tomorrow_temp = parseInt(tomorrow.high.fahrenheit); 
    var result = "There's no reason to go outside."; 
    if (parseInt(today.precip_today_in) > 1) {
        result = "Stay inside! Water might fall from the sky!";
    } else if((this_date.getMonth() > 4) && (this_date.getMonth() < 10)) {
        // summer
        if(((today_temp + 3) < yesterday_temp) && ((today_temp + 3) < tomorrow_temp)) {
            result = "You should go out today! It's going to be noticeably cool!";
        } else if ((today + 3) < yesterday_temp) {
            result = "You should go outside! It's cooler than yesterday!";
        } else if ((today + 3) < tomorrow_temp) {
            result = "Quick! Go outside today! Tomorrow will be hotter!";
        }
    } else {
        //winter
        if(((today_temp - 2) > yesterday_temp) && ((today_temp - 2) > tomorrow_temp)) {
            result = "You should go out today! It's going to be noticeably warm!";
        } else if ((today_temp - 2) > yesterday_temp) {
            result = "Go outside, it's warmer than yesterday!";
        } else if ((today_temp - 2) > tomorrow_temp) {
            result = "Go outside before it gets cold tomorrow!";
        }
    }
    console.log("goOutToday worked!");
    return result
}
function populateWeather(today_weather, yesterday_weather, tomorrow_weather) {
    var yesterday = document.getElementById("yesterday2");
    var tomorrow = document.getElementById("tomorrow1");
    var today = document.getElementById("today");
    var tod_high = document.getElementById("high");
    var tod_low = document.getElementById("low");
    var tod_now = document.getElementById("now");
    yesterday.textContent = parseInt(yesterday_weather.meantempi);
    tomorrow.textContent = parseInt(tomorrow_weather.high.fahrenheit);
    today.textContent = today_weather.temp_f;
}

function useZip() {
    zip = document.zipform.zip.value;
    console.log(zip);
    zip = parseInt(zip);
    console.log(zip);
    
    getWeather(zip);
    goOutToday(today_weather, yesterday_weather, tomorrow_weather);
    populateWeather(today_weather, yesterday_weather, tomorrow_weather);
}



