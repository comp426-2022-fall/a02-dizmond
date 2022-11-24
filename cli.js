#!/usr/bin/env node
import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

const timezone = moment.tz.guess()
// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.91&longitude=-79.06&hourly=temperature_2m');

// Get the data from the request
console.log(response);
console.log(timezone);


// const days = args.d
