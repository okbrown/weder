'use strict';

import nconf from 'nconf';

nconf.argv().env().defaults({
	HOSTNAME: 'localhost:7902',
	PORT: 7902,
	BBC_LOCATION_API: 'http://www.bbc.co.uk/locator/default/en-GB/autocomplete.json?search=',
	BBC_FORECAST_API: 'https://weather-broker-cdn.api.bbci.co.uk/en/forecast/aggregated'
});

const getConfig = name => nconf.get(name);

export default getConfig;
