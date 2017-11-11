'use strict';

import nconf from 'nconf';

nconf.argv().env().defaults({
	HOSTNAME: 'localhost',
	PORT: 7901,
	GEO_API: '',
	GEO_KEY: ''
});

const getConfig = name => nconf.get(name);

export default getConfig;
