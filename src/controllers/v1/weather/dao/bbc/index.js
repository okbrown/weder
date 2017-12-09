'use strict'

import http from 'services/http-request';
import get from 'lodash/get';
import cheerio from 'cheerio';
import dateFns from 'date-fns';
import { getTextValues, getEachAttrib, _trim, _replace } from 'bbc-helpers';
import { html } from '../../../../../test-data/bbc-test-data';


const getBBCWeatherID = async (location) => {
	const bbcUrl = 'http://www.bbc.co.uk/locator/default/en-GB/autocomplete.json?search=';
	const data = await http(`${ bbcUrl + encodeURIComponent(location) }`, null, 'GET');
	const id = get(data, '[0].id');
	const name = get(data, '[0].fullName');
	return { id, name };
}

const getWeatherData = ($) => {
	const text = '.\n        Each column contains hourly forecast details for weather conditions, temperature, wind speed, wind direction, humidity, visibility and pressure.';

	const caption = $('caption').text().replace(text,'');
	const	sunrise = $('.sunrise').text();
	const	sunset = $('.sunset').text();

	const times = getTextValues($('tr').find('.time > .value')).map(time => _trim(_replace(time, /\D/g)));
	const hour = getTextValues($('tr.time').find('span.hour'));
	const mins = getTextValues($('tr.time').find('span.mins'));

	const weatherType = getEachAttrib($('tr.weather-type > td.hours-1 > span.content > img'), 'title');
	const windSpeed = getEachAttrib($('tr.windspeed > td.hours-1 > .wind-speed'), 'data-tooltip-mph');
	const windDirection = getEachAttrib($('tr.wind-direction > td.hours-1 > abbr'), 'title');

	const temperature = getTextValues(
		$('tr.temperature > td.hours-1').find('.temperature-value-unit-c')).map(temp => parseInt(_trim(_replace(temp, '°C')))
	);
	const humidity = getTextValues($('tr.humidity > td.value')).map(_trim);
	const visibility = getEachAttrib($('tr.visibility > td.hours-1 > abbr'), 'title');
	const pressure = getTextValues($('tr.pressure > td.value')).map(_trim);

	const weatherData = times.map((time, i) => (
		{
			time: `${ hour[i] }:${ mins[i] }`,
			type: weatherType[i],
			temp: temperature[i],
			wind: {
				speed: windSpeed[i],
				direction: windDirection[i]
			},
			humidity: humidity[i],
			visibility: visibility[i],
			pressure: pressure[i],
		}
		)
	);

	return {
		caption,
		sunrise,
		sunset,
		weatherData
	}
}

const getForecast = async (location) => {
	const { id, name }  = await getBBCWeatherID(location);
	if (!id) return { error: `Unable to find location: ${ location }` }
	const date = dateFns.format(new Date(), 'YYYY-MM-DD');
	const url = `http://www.bbc.co.uk/weather/en/${ id }/daily/${ date }?day=0`;
	const data = await http(url, null, 'GET');
	const $ = cheerio.load(html);
	const weatherData = getWeatherData($);

	return {
		location: name,
		...weatherData
	}
}

export default getForecast
