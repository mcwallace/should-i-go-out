// KEY IS e05c147cb6482135 for weather underground
// put attribution @ footer
// GET USER LOCATION via user prompt if mobile, ip address if desktop or mobile doesn't give permissions

// eventually this should be the result of a form, hardcoded to philly for testing
var zip = 19104;

var api = "http://api.wunderground.com/api/e05c147cb6482135/"

var today_weather = api + "/conditions/q/" + zip + ".json"





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
