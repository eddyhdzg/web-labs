const Person = require("../models/person");

const getPersons = function(req, res) {
  Person.find({})
    .then(function(persons) {
      res.send(persons);
    })
    .catch(function(error) {
      res.status(500).send(error);
    });
};

const getPersonById = function(req, res) {
  const _id = req.params.id;
  Person.findById(_id)
    .then(function(person) {
      if (!person) {
        return res.status(404).send();
      }
      return res.send(person);
    })
    .catch(function(error) {
      return res.status(500).send(error);
    });
};

const postPerson = function(req, res) {
  const person = new Person(req.body);
  person
    .save()
    .then(function() {
      return res.send(person);
    })
    .catch(function(error) {
      return res.status(400).send(error);
    });
};

const patchPersonById = function(req, res) {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "alliegance",
    "titles",
    "name",
    "age",
    "born",
    "timeline",
    "playedBy",
    "father",
    "mother",
    "spouse"
  ];
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({
      error: "Invalid update, only allowed to update: " + allowedUpdates
    });
  }
  Person.findByIdAndUpdate(_id, req.body)
    .then(function(person) {
      if (!person) {
        return res.status(404).send();
      }
      return res.send(person);
    })
    .catch(function(error) {
      res.status(500).send(error);
    });
};

const deletePerson = function(req, res) {
  const _id = req.params.id;

  Person.findByIdAndRemove(_id)
    .then(function(person) {
      if (!person) {
        return res.status(404).send();
      }
      return res.send(person);
    })
    .catch(function(error) {
      res.status(505).send(error);
    });
};

module.exports = {
  getPersons,
  getPersonById,
  postPerson,
  patchPersonById,
  deletePerson
};
