const myController = require("../controllers");
const routes = require("express").Router();

routes.get("/", myController.awesomeFunction);
routes.get("/ttech", myController.tooeleTechFunction);
routes.get("/students", myController.getAllStudents);

module.exports = routes;
