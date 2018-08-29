'use strict';

import http from 'services/http-request';
import getConfig from 'config';

const bbcLocationAPI = getConfig('BBC_LOCATION_API');
const bbcForecastAPI = getConfig('BBC_FORECAST_API');

const getBBCLocation = async (location) => {
	return await http(`${ bbcLocationAPI }${ location }`, null, 'GET');
};

const getBBCWeatherByLocationID = async (id) => {
	return await http(`${ bbcForecastAPI }/${ id }`, null, 'GET');
};

export default {
	getBBCLocation,
	getBBCWeatherByLocationID
}