// https://stackoverflow.com/questions/29333506/npm-request-not-getting-json-response-when-doing-body-object
// https://www.npmjs.com/package/request

// Modules
var request = require("request");

// Keys
const { MAPBOX_TOKEN, DARK_SKY_SECRET_KEY } = require("./credentials.js");

/**
    Recieves the name of a city and returns and looks for its lat and long
    
    @param cityName Name of city to get its lat and long
*/
let latAndLongOfCity = cityName => {
  let mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${MAPBOX_TOKEN}`; // URL de Mapbox API con la ciudad mandada como param de la función

  request.get({ url: mapBoxURL, json: true }, (error, response, data) => {
    let long = data.features[0].center[0];
    let lat = data.features[0].center[1];

    now(lat, long);
  });
};

/**
    Recieves a latitude and a longitude and console.log a string with the weather condition
    @param cityName Name of city to get its lat and long
*/
let now = (lat, long) => {
  let darkSkyURL = `https://api.darksky.net/forecast/${DARK_SKY_SECRET_KEY}/${lat},${long}/?lang=es&units=si`; // URL de Dark Sky API con la lat y long

  request.get({ url: darkSkyURL, json: true }, (error, response, data) => {
    // Supogno que quiere la condición del día y no la del momento...
    let dayCondition = data.hourly.summary; // Condición del día

    let { precipProbability, temperature } = data.currently; // Condiciones acualtes I guess

    console.log(
      `${dayCondition} Actualmente esta a ${temperature}°C. Hay ${precipProbability}% de posibilidad de lluvia."`
    );
  });
};

latAndLongOfCity("Monterrey");
