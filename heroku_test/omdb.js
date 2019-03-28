const credentials = require("./credentials.js");
const request = require("request");

if (process.env.NODE_ENV === "production") {
  var APIKEY = process.env.APIKEY;
} else {
  const credentials = require("./credentials.js");
  var APIKEY = credentials.apikey;
}

const omdbMovie = function(title, callback) {
  const url = "http://www.omdbapi.com/?t=" + title + "&apikey=" + APIKEY;
  request({ url: url, json: true }, function(error, response) {
    if (error) {
      callback("Service unavailable", undefined);
    } else if (response.body.Response == "False") {
      callback(response.body.Error, undefined);
    } else {
      const data = response.body;
      const info = {
        title: data.Title,
        plot: data.Plot,
        rating: data.Ratings[0].Value,
        seasons: data.totalSeasons
      };
      callback(undefined, info);
      //omdbSeason(title, info.seasons)
    }
  });
};

const omdbSeason = function(title, seasonNo, callback) {
  const url =
    "http://www.omdbapi.com/?t=" +
    title +
    "&Season=" +
    seasonNo +
    "&apikey=" +
    APIKEY;
  request({ url, json: true }, function(error, response) {
    if (error) {
      callback("Service unavailable", undefined);
    } else if (response.body.Response == "False") {
      callback(response.body.Error, undefined);
    } else {
      const data = response.body;
      const info = {
        title: data.Title,
        season: data.Season,
        episodes: []
      };
      for (i in data.Episodes) {
        info.episodes.push(data.Episodes[i].Title);
      }
      callback(undefined, info);
    }
  });
};

module.exports = {
  omdbMovie: omdbMovie,
  omdbSeason: omdbSeason
};
