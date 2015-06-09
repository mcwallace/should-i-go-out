// KEY IS e05c147cb6482135 for weather underground
// put attribution @ footer
// GET USER LOCATION via user prompt if mobile, ip address if desktop or mobile doesn't give permissions

// eventually this should be the result of a form, but now it's hardcoded to philly for testing
var zip = 19104;


//should eventually switch to a different api, if traffic increases
// http://openweathermap.org/appid  
// https://developer.forecast.io/
var api = "http://api.wunderground.com/api/e05c147cb6482135";

// TODO: find a way to combine these queries into one query--can we get the entire week's weather in one call???
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

console.log(tomorrow_weather);
console.log(yesterday_weather);
console.log(today_weather);

function goOutToday(today, yesterday, tomorrow) {
    var this_date = new Date();
    var today_temp = today.temp_f;
    var yesterday_temp = parseInt(yesterday.meantempi);
    var tomorrow_temp = parseInt(tomorrow.high.fahrenheit); 
    var result = "The weather today isn't remarkable."; 
    if (parseInt(today.precip_today_in) > 1) {
        result = "Stay inside! Water might fall from the sky!";
    } else if((this_date.getMonth() > 4) && (this_date.getMonth() < 10)) {
        // summer
        if(((today_temp + 3) < yesterday_temp) && ((today_temp + 3) < tomorrow_temp)) {
            result = "You should go out today! It's going to be noticeably cool!";
        }
    } else {
        //winter
        if(((today_temp - 2) > yesterday_temp) && ((today_temp - 2) > tomorrow_temp)) {
            result = "You should go out today! It's going to be noticeably warm!";
        }
    }
    console.log("goOutToday worked!");
    return result
}

var goOut = goOutToday(today_weather, yesterday_weather, tomorrow_weather);
var suggestion = document.getElementById("suggestions");
suggestion.textContent = goOut;
