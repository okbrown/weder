"use strict";

import express from 'express';
import cors from 'cors';
import * as w from 'middleware/bbc';

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const showExplorer = true;
const options = {
	validatorUrl: null,
	docExpansion: 'none'
};

const api = express.Router();

api.use('*', cors());

api.get(
	'/weather/:where',
	w.getLocations(),
	w.getLocation(),
	w.getWeather()
);

api.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, showExplorer, options));

/**
 * Send 404 response for everything else.
 */
api.use((req, res) => {
	res.status(404);
	res.json({
		"status": 404,
		"message": "The requested endpoint is not recognised"
	});
});

export default api;
