#!/usr/bin/env node
import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

let latitude = 35.875
let longitude = -79
//America%2FNew_York
const timezone = moment.tz.guess()
// Make a request

const argv = minimist(process.argv.slice(2));



const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&timezone=' + timezone + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch');
const data = await response.json();
if (argv.h === true) {
    console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE');
    console.log('    -h            Show this help message and exit.');
    console.log('    -n, -s        Latitude: N positive; S negative.');
    console.log('    -e, -w        Longitude: E positive; W negative.');
    console.log('    -z            Time zone: uses tz.guess() from moment-timezone by default.');
    console.log('    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.');
    console.log('    -j            Echo pretty JSON from open-meteo API and exit.');
    process.exit(0);
} else if (argv.j === true) {
    console.log(data);
    process.exit(0);
} else if (argv.d == 0) {
    console.log("There will be " + data.daily.precipitation_hours[0] + " hours of precipitation today.")
} else if (argv.d > 1) {
    console.log("There will be " + data.daily.precipitation_hours[argv.d] + " hours of precipitation in " + argv.d + " days.")
} else {
    console.log("There will be " + data.daily.precipitation_hours[1] + " hours of precipitation tomorrow.")
}

