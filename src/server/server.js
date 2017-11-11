"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
//import morgan from 'morgan';
//import middleware from '../middleware';
import routes from '../routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware applied to all routes
//app.use(middleware.example);
app.use(compression());

// use morgan to log requests to the console
//app.use(morgan('dev'));

// separate routes
app.use('/', routes);

export default {
	create() {
		return app;
	},
};
