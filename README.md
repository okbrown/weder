# Weder

### Weder, (old english for weather) is a API for returning BBC weather forecasts in JSON format.

#### Requirements
- Node 7.8.0 +
- NPM/Yarn
- WebPack
- Babel, babel-env, stage-0

#### To start application
- yarn
- yarn start

#### To build
- yarn build

#### Swagger Docs
- http://[hostname]/v1/docs

#### Endpoint
http://[hostname]/v1/weather/[location]

#### Details
After using the BBC Weather APP for some time now I have found the forecasts to be accurate 80% of the time. Originally I assumed they had their own API I could use to build my own weather app, but found out that ended a long time ago. I'm not 100% sure where they are getting their data from but I believe it is from the Met Office (http://metoffice.gov.uk/datapoint) Data Point API. An API that has the most horrid documentation. It was actually quicker to write a scraper for the BBC. I will eventually re-visit that route, but it was more fun scraping the BBC anyway.

This endpoint has some limitations, e.g. the locations might not always be the one you want. The BBC uses ID's for all their locations, which I am sure comes from another source. 

So for now this will help to provide as an API to aid in building my own weather app. (Stay tuned)

However feel free to use and mess about with this project should you need BBC Weather Data.