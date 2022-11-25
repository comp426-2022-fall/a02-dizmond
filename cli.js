#!/usr/bin/env node
import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const timezone = moment.tz.guess()
// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.91&longitude=-79.06&hourly=temperature_2m');

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
} else if (argv.j === true) {
    console.log('return JSON weather data here');
    process.exit(0);
} else if (argv.d == 0) {
    console.log("today.")
} else if (argv.d > 1) {
    console.log("in " + argv.d + " days.")
} else {
    console.log("tomorrow.")
}

// Get the data from the request
//console.log(response);
console.log(timezone);


// const days = args.d
