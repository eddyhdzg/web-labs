const mongoose = require("mongoose");

const connectionURL = "mongodb://localhost:27017/local";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
});
