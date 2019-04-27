const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  born: String,
  timeline: String,
  alliegance: Array,
  playedBy: String,
  titles: Array,
  father: String,
  mother: String,
  spouse: String
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
