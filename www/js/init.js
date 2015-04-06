// true: Browser debugging
// false: Run on Android
var DEBUG = false;

// AirTennisFriend Parse configuration
//var PARSE_APP_ID = "HVv6n4HRoWZliaTWXkmcs3t8qkCAW1gGCkqg1onI";
var PARSE_APP_ID = "HVv6n4HRoWZliaTWXkmcs3t8qkCAW1gGCkqg1onI";
//var PARSE_CLIENT_KEY = "uNqt68PLNSg0SZZdTyOtzYrSKKzKvA0X8YSvzxGU";
var PARSE_JS_KEY = "eUPavTmrD16fdWi3yWEWuqT7TXHrHmzZBzM8yPmm";
//var PARSE_REST_API_KEY = "1JmRqUc9tD71UtSF3eAne8UhaiIoAlgk3xwVyrfQ";
var PARSE_REST_API_KEY = "1JmRqUc9tD71UtSF3eAne8UhaiIoAlgk3xwVyrfQ";
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);

var MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
/*
$(document).on("scrollstart", function() {
    console.log("Started scrolling");
});
$(document).on("scrollstop", function() {
    console.log("Stopped scrolling");
});
*/
