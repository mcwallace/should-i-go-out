// KEY IS e05c147cb6482135 for weather underground
// put attribution @ footer
// GET USER LOCATION via user prompt if mobile, ip address if desktop or mobile doesn't give permissions

// eventually this should be the result of a form, hardcoded to philly for testing
var zip = 19104;


//should eventually switch to a different api, if traffic increases
// http://openweathermap.org/appid  
// https://developer.forecast.io/
var api = "http://api.wunderground.com/api/e05c147cb6482135/";

// TODO: find a way to combine these queries into one query--can we get the entire week's weather in one call???
var today_request = api + "/conditions/q/" + zip + ",us.json";
var yesterday_request = api + "/yesterday/q" + zip + ",us.json";
var tomorrow_request = api + "/forecast/q" + zip + ",us.json";

var xhr = new XMLHttpRequest();
xhr.open("GET", today_request, false);
xhr.send();
console.log("Fires???");

var yhr = new XMLHttpRequest();
yhr.open("GET", today_request, false);
yhr.send();

var thr = new XMLHttpRequest();
thr.open("GET", yesterday_request, false);
thr.send();

var today_weather = JSON.parse(xhr.response).current_observation;
var tomorrow_weather = JSON.parse(thr.response)
var yesterday_weather = JSON.parse(yhr.response)

console.log(tomorrow_weather);
console.log(yesterday_weather);

// function GoOutToday(today_weather, yesterday_weather, tomorrow_weather) {
//     var today = new Date() ; 
//     today_temp = today_weather.temp_f;
//     yesterday_temp = yesterday_weather.
//     if((today.getMonth() > 4) && (today.getMonth() < 10)) {
//         // summer

//     }
// }


// the rest of my CRUDE AF outline

// if weather_data.date > today.date - 18h: //an attempt to reduce the number of calls to the api/day
//     weather_data = weather_data
//     if not yesterday.exists()
//         yesterday = api….(today.date-1d).json
// else:
//     yesterday = weather_data
//     weather_data = http://api.wunderground.com/api/e05c147cb6482135/conditions/q/CA/San_Francisco.json[current_observation])


// var yesterday, today, tomorrow, summer

// summer = true if (today.date in May 1 to Nov 1)
// today = weather_data.temp_f
// today_rain = qpf_allday
// today_snow = snow_allday



// function lessthan(a, b) {
// //so we only return true on noticeably better days
//     if (a + 3) < b {
//         return true;
//     } else {
//         return false ; 
//     }
// }


// if (today_rain || today_snow) {
//     false
// } else if (summer) {
//     if (lessthan(today, yesterday)) || (lessthan(today, tomorrow)) {
//         true;
//     } else {
//         false;
//     }
// } else {
//     if (lessthan(yesterday, today) || (lessthan(tomorrow, today) {
//         true;
//     } else {
//         false;
//     }
// */
