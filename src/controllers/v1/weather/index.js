'use strict'

import getForecast from './dao/bbc';

const weatherByTown = async (req, res) => {

	let { where } = req.params;
	let forecast = await getForecast(where);
	res.json({ forecast });
}


export default {
	weatherByTown
}