// Modules
var request = require("request");

// Keys
const { MAPBOX_TOKEN, DARK_SKY_SECRET_KEY } = require("./credentials.js");

/**
    Recieves the name of a city and returns an object with its latitude and longitude
    
    @param cityName Name of city
    @return { lat, long } Object with lat and long
*/
let latAndLongOfCity = (cityName, callback) => {
  let mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${MAPBOX_TOKEN}`; // URL de Mapbox API con la ciudad mandada como param de la función

  request.get({ url: mapBoxURL, json: true }, (error, response, data) => {
    if (response.statusCode == 200) {
      let long = data.features[0].center[0];
      let lat = data.features[0].center[1];
      callback({ lat, long });
    } else if (response.statusCode == 401) {
      // Not Autorized/ Invalid Token
      console.log(data.message + "ERROR CODE: 401");
      callback(undefined, data.message);
    } else {
      console.log(data);
      callback(undefined, error);
    }
  });
};

/**
    Recieves an object with a latitude and a longitude and returns an object with the 1) day condition, 2) temperature and 3) precipitation probability 

    @param lat Latitude 
    @param long Longitude 
    @return { dayCondition, temperature, precipProbability} Object with dayCondition, temperature, precipProbability
*/
let now = (lat, long, callback) => {
  let darkSkyURL = `https://api.darksky.net/forecast/${DARK_SKY_SECRET_KEY}/${lat},${long}/?lang=es&units=si`; // URL de Dark Sky API con la lat y long

  request.get({ url: darkSkyURL, json: true }, (error, response, data) => {
    if (response.statusCode == 200) {
      let dayCondition = data.hourly.summary; // Supogno que quiere la condición del día y no la del momento, ...condición del día
      let { precipProbability, temperature } = data.currently; // Condiciones acualtes I guess
      callback({ dayCondition, temperature, precipProbability });
    } else if (response.statusCode == 401) {
      // Not Autorized/ Invalid Token
      callback(undefined, response.body);
    } else {
      callback(undefined, response.body);
    }
  });
};

/**
    Recieves an object with a data of a day condition and console.log() a string with its condition

    @param data Object with 1) day condition, 2) temperature and 3) precipitation probability 
*/
let print = data => {
  console.log(
    `${data.dayCondition} Actualmente esta a ${data.temperature}°C. Hay ${
      data.precipProbability
    }% de posibilidad de lluvia."`
  );
};

latAndLongOfCity("Monterrey", res => {
  now(res.lat, res.long, data => {
    print(data);
  });
});
