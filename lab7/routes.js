const express = require("express");

const router = express.Router();

const Person = require("./models/person");

const persons = require("./controllers/persons");

router.get("/persons", persons.getPersons);
router.get("/persons/:id", persons.getPersonById);
router.post("/persons", persons.postPerson);
router.patch("/persons/:id", persons.patchPersonById);
router.delete("/persons/:id", persons.deletePerson);

module.exports = router;
