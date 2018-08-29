'use strict';

import getForecast from './dao/bbc';

const weatherByTown = async (req, res) => {
	let { where } = req.params;
	try {
		let forecast = await getForecast(where);
		res.json({ forecast });
	}
	catch (err) {
		console.log(err.message);
		res.json({ err});
	}
};

export default {
	weatherByTown
};
