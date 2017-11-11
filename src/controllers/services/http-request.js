"use strict";

import req from 'axios';

const httpRequest = (url, body, method, headers) => {
	let options = { url, body, headers, json:true }
	if (method){
		_validateRequestMethod(method);
		options.method = method;
	}

	return new Promise((resolve, reject) => {
		req(options)
		.then(({ data }) => resolve(data))
		.catch(error => reject(error))
	})
}

const _validateRequestMethod = (method) => {
	const requestMethods = {
		'POST': true,
		'GET': true
	}
	if (!requestMethods[method]){
		throw Error('Not a valid request method');
	}
}


export default httpRequest;