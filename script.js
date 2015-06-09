// KEY IS e05c147cb6482135 for weather underground
// put attribution @ footer
// GET USER LOCATION via user prompt if mobile, ip address if desktop or mobile doesn't give permissions

// eventually this should be the result of a form, hardcoded to philly for testing
var zip = 19104;


//should eventually switch to a different api, if traffic increases
// http://openweathermap.org/appid  
// https://developer.forecast.io/
var api = "http://api.wunderground.com/api/e05c147cb6482135";

// TODO: find a way to combine these queries into one query--can we get the entire week's weather in one call???
var today_request = api + "/conditions/q/" + zip + ",us.json";
var yesterday_request = api + "/yesterday/q/" + zip + ",us.json";

var xhr = new XMLHttpRequest();
xhr.open("GET", today_request);
xhr.send();
console.log("checking json??");

var yhr = new XMLHttpRequest();
yhr.open("GET", yesterday_request);
yhr.send();

var today_weather = JSON.parse(xhr.response).current_observation;
var yesterday_weather = JSON.parse(yhr.response).history.dailysummary;
var tomorrow_weather = JSON.parse(xhr.forecast);

console.log(tomorrow_weather);
console.log(yesterday_weather);
console.log(today_weather);

function goOutToday(today, yesterday, tomorrow) {
    var today_temp = today.temp_f;
    var yesterday_temp = yesterday.meantempi;
    var tomorrow_temp = 99;  // (parseInt(tomorrow.simpleforecast[2].high.farenheit) + parseInt(tomorrow.simpleforecast[2].low.farenheit))/2 // placeholder
    if (parseInt(today.precip_today_in) > 1) {
        console.log("Stay inside! Water might fall from the sky!");
    } else if((today.getMonth() > 4) && (today.getMonth() < 10)) {
        // summer
        if(((today_temp + 3) < yesterday_temp) && ((today_temp + 3) < tomorrow_temp)) {
            console.log("You should go out today! It's going to be noticeably cool!");
        }
    } else {
        //winter
        if(((today_temp - 2) > yesterday_temp) && ((today_temp - 2) > tomorrow_temp)) {
            console.log("You should go out today! It's going to be noticeably warm!");
        }
    }
    console.log("goOutToday worked!");
}

goOutToday(today_weather, yesterday_weather, tomorrow_weather);


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
