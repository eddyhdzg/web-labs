const request = require("request");

const express = require("express");

// const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
// const DARK_SKY_SECRET_KEY = process.env.DARK_SKY_SECRET_KEY;

const { MAPBOX_TOKEN, DARK_SKY_SECRET_KEY } = require("./credentials.js");

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("ola k ase");
});

app.get("/weather", (req, res) => {
  weatherRequest(req, res);
});

app.get("*", (req, res) => {
  res.send({
    error: "Esta ruta no existe"
  });
});

app.listen(port, () => {
  console.log("up and running");
});

let weatherRequest = (req, res) => {
  let mapBoxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
    req.query.search
  }.json?access_token=${MAPBOX_TOKEN}`;
  req.city = req.query.search;
  request(mapBoxURL, (err, request, body) => {
    latAndLongOfCity(err, request, body, req, res);
  });
};

let requestDarksky = (lat, long, req, res) => {
  let darkSkyURL = `https://api.darksky.net/forecast/${DARK_SKY_SECRET_KEY}/${lat},${long}?lang=es&units=si`;
  request(darkSkyURL, (err, request, body) => {
    now(err, request, body, req, res);
  });
};

let latAndLongOfCity = (error, request, body, req, res) => {
  if (!error) {
    const jsonBody = JSON.parse(body);
    try {
      if (jsonBody.features.length > 0) {
        const longitude = jsonBody.features[0].center[0];
        const latitude = jsonBody.features[0].center[1];
        requestDarksky(latitude, longitude, req, res);
      } else {
        res.json({
          error: "ERROR EN MAPBOX API"
        });
      }
    } catch (e) {
      if (jsonBody.message)
        res.json({
          error: `${jsonBody.message}`
        });
      else
        res.json({
          error: `ERROR EN MAPBOX API: ${e}`
        });
    }
  } else {
    res.json({
      error: `ERROR EN MAPBOX API: ${error}`
    });
  }
};

let now = (error, request, body, req, res) => {
  if (!error) {
    try {
      const jsonBody = JSON.parse(body);
      res.json({
        city: req.city,
        weather: `${jsonBody.daily.summary} Actualmente está a ${
          jsonBody.currently.temperature
        }°C. Hay ${jsonBody.daily.data[0].precipProbability *
          100}% de posibilidad de lluvia.`
      });
    } catch (e) {
      res.json({
        error: `ERROR EN DARKSKY API: ${body}`
      });
    }
  } else {
    res.json({
      error: `ERROR EN DARKSKY API: ${error}`
    });
  }
};
