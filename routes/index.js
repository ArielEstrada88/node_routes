// Y o u___S h a l l___N o t___P a s s

//Here you are the Gatekeeper_/_Secretary
// telling EXPRESS: "If someone
// wants /auth, go check auth.js(file)"

//__I m p o r t a n t___N o t i c e:
// This file makes EVERYTHING work together!!!

// Its like a police officer at a intersection
// when the light goes out.
// P r e v e n t i n g___crashes
// from happening

const routes = require("express").Router();
const myController = require("../controllers");

routes.get("/", myController.awesomeFunction);
routes.get("/ttech", myController.tooeleTechFunction);

//  student routes
routes.use("/students", require("./students"));

// auth routes
routes.use("/auth", require("./auth"));

module.exports = routes;
