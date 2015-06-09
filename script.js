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

console.log("logging line by line KILL EVERYTHING");
var xhr = new XMLHttpRequest();
xhr.open("GET", today_request);
xhr.send();

var yhr = new XMLHttpRequest();
yhr.open("GET", yesterday_request);
yhr.send();

var thr = new XMLHttpRequest();
thr.open("GET", tomorrow_request);
thr.send()
console.log("line by line: YESTERDAY");

console.log("line by line PARSE TODAY");
var today_weather = JSON.parse(xhr.response).current_observation;

console.log("line by line PARSE YESTERDAY");
var yesterday_weather = JSON.parse(yhr.response).history.dailysummary;

console.log("line by line PARSE TOMORROW");

var tomorrow_weather = JSON.parse(thr.response).forecast.simpleforecast.forecastday[1];

console.log(tomorrow_weather);
console.log(yesterday_weather);
console.log(today_weather);

function goOutToday(today, yesterday, tomorrow) {
    var today_temp = today.temp_f;
    var yesterday_temp = yesterday.meantempi;
    var tomorrow_temp = parseInt(tomorrow.high.farenheit);  // (parseInt(tomorrow.simpleforecast[2].high.farenheit) + parseInt(tomorrow.simpleforecast[2].low.farenheit))/2 // placeholder
    // if (parseInt(today.precip_today_in) > 1) {
    //     console.log("Stay inside! Water might fall from the sky!");
    // } else if((today.getMonth() > 4) && (today.getMonth() < 10)) {
    //     // summer
    //     if(((today_temp + 3) < yesterday_temp) && ((today_temp + 3) < tomorrow_temp)) {
    //         console.log("You should go out today! It's going to be noticeably cool!");
    //     }
    // } else {
    //     //winter
    //     if(((today_temp - 2) > yesterday_temp) && ((today_temp - 2) > tomorrow_temp)) {
    //         console.log("You should go out today! It's going to be noticeably warm!");
    //     }
    // }
    console.log("goOutToday worked!");
}

goOutToday(today_weather, yesterday_weather, tomorrow_weather);


// my CRUDE AF outline

// if weather_data.date > today.date - 18h: //an attempt to reduce the number of calls to the api/day
//     weather_data = weather_data
//     if not yesterday.exists()
//         yesterday = api….(today.date-1d).json
// else:
//     yesterday = weather_data
//     weather_data = http://api.wunderground.com/api/e05c147cb6482135/conditions/q/CA/San_Francisco.json[current_observation])

// function lessthan(a, b) {
// //so we only return true on noticeably better days
//     if (a + 3) < b {
//         return true;
//     } else {
//         return false ; 
//     }
// }
