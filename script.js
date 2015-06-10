// KEY IS e05c147cb6482135 for weather underground
// put attribution @ footer

//should eventually switch to a different api, if traffic increases
// http://openweathermap.org/appid  
// https://developer.forecast.io/

//////////opening variables
var api = "http://api.wunderground.com/api/e05c147cb6482135";
var today_weather, yesterday_weather, tomorrow_weather, zip; 

zip = useZip;
startup(zip);

////////////////////////functions

function startup(zip) {
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
}

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
    var tomorrow_weather = JSON.parse(thr.response).forecast.simpleforecast.forecastday;

    return [today_weather, yesterday_weather, tomorrow_weather]
}

function goOutToday(today, yesterday, tomorrow) {
    var this_date = new Date();
    var today_temp = today.temp_f;
    var yesterday_temp = parseInt(yesterday.meantempi);
    var tomorrow_temp = parseInt(tomorrow[1].high.fahrenheit); 
    var result = "There's no reason to go outside."; 
    console.log(today_temp);
    console.log(yesterday_temp);
    console.log(tomorrow_temp);
    //// THIS SHOULD BE FROM tomorrow[0].qpf_allday
    if (tomorrow[0].qpf_allday.in > 1) {
        console.log(tomorrow[0].qpf_allday.in);
        result = "Stay inside! Water might fall from the sky!";
    } else if((this_date.getMonth() > 4) && (this_date.getMonth() < 10)) {
        // summer
        console.log("summer");
        console.log(((today_temp + 3) < yesterday_temp));
        console.log((today_temp + 3) < tomorrow_temp)
        if(((today_temp + 3) < yesterday_temp) && ((today_temp + 3) < tomorrow_temp)) {
            result = "You should go out today! It's going to be noticeably cool!";
        } else if ((today_temp + 3) < yesterday_temp) {
            result = "You should go outside! It's cooler than yesterday!";
        } else if ((today_temp + 3) < tomorrow_temp) {
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
    console.log("populating weather");
    var yesterday = document.getElementById("yesterday2");
    var tomorrow = document.getElementById("tomorrow1");
    var today = document.getElementById("today");
    var tod_high = document.getElementById("high");
    var tod_low = document.getElementById("low");
    var tod_now = document.getElementById("now");
    yesterday.textContent = parseInt(yesterday_weather.meantempi);
    tomorrow.textContent = parseInt(tomorrow_weather[1].high.fahrenheit);
    today.textContent = today_weather.temp_f;
    tod_high.textContent = parseInt(tomorrow_weather[0].high.fahrenheit);
    tod_low.textContent = parseInt(tomorrow_weather[0].low.fahrenheit);
    tod_now.textContent = tomorrow_weather[0].conditions;
}

function useZip() {
    zip = 19104 ; 
    value = document.getElementById("zip").value;
    console.log(value);
    if(value.length === 5) {
        zip = parseInt(value);  
        startup(zip);
    }
    console.log(value);
    return zip; 
}



