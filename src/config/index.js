'use strict';

import nconf from 'nconf';

nconf.argv().env().defaults({
	HOSTNAME: 'localhost:7902',
	PORT: 7902
});

const getConfig = name => nconf.get(name);

export default getConfig;
