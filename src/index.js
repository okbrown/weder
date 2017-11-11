"use strict";

import config from './config';
import server from './server';

const app = server.create();
const host = config('HOSTNAME');
const port = config('PORT');

app.listen(port, () => {
	console.log(`✅ 😀 - Weder API server is running at http://${ host }`);
	console.log(`Try me: http://${ host }`);
	console.log(`Swagger docs http://${ host }`);
});