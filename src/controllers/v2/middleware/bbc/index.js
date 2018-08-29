'use strict';

import _get from 'lodash/get';
import bbc from 'model/weather/bbc';

export const getLocations = () => {
	return async (req, res, next) => {
		const where = _get(req, 'params.where');
		try {
			const locations = await bbc.getBBCLocation(where);
			isLocations(locations, where);
			res.locals.locations = locations;
			next();
		}
		catch (e) {
			res.json({ error: e.message });
		}
	};
};

export const getLocation = () => {
	return async (req, res, next) => {
		const { locations } = res.locals;
		res.locals.location = locations[0];
		next();
	};
};

export const getWeather = () => {
	return async (req, res, next) => {
		const location = res.locals.location;
		const { id } = location;
		const data = await bbc.getBBCWeatherByLocationID(id);
		const response = {
			forecast: {
				location,
				...data
			}
		};
		res.json(response);
	};
};

const isLocations = (locations, where) => {
	if (!locations.length) {
		throw Error(`location: ${ where } not found.`);
	}
	return locations;
};