#!/usr/bin/env node
import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

let latitude = 35.88
let longitude = -79
let timezone = moment.tz.guess()
let days = 1

//process command line text
const argv = minimist(process.argv.slice(2));


if (argv.h === true) {
    console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE');
    console.log('    -h            Show this help message and exit.');
    console.log('    -n, -s        Latitude: N positive; S negative.');
    console.log('    -e, -w        Longitude: E positive; W negative.');
    console.log('    -z            Time zone: uses tz.guess() from moment-timezone by default.');
    console.log('    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.');
    console.log('    -j            Echo pretty JSON from open-meteo API and exit.');
    process.exit(0);
}


if (argv.z) {
    timezone = argv.z;
}

if (argv.n) {
    latitude = +((argv.n).toFixed(2));
} else if (argv.s) {
    latitude = -((argv.s).toFixed(2));
} else {
    console.log('Latitude must be in range');
    process.exit(0);
}

if (argv.e) {
    longitude = +((argv.e).toFixed(2));
} else if (argv.w) {
    longitude = -((argv.w).toFixed(2));
} else {
    console.log('Longitude must be in range');
    process.exit(0);
}


//create response and retrieve back data
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&timezone=' + timezone + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch');
const data = await response.json();

if (argv.j === true) {
    console.log(data);
    process.exit(0);
}

if (argv.d >= 0) {
    days = argv.d;
}

if (data.daily.precipitation_hours[days] > 0) {
    console.log("You might need your galoshes ");
} else {
    console.log("You will not need your galoshes ");
}

if (days == 0) {
    console.log("today.")
} else if (days > 1) {
    console.log("in " + days + " days.")
} else {
    console.log("tomorrow.")
}
