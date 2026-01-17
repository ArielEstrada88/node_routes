const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/index");

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getSingleStudent);

router.post("/", StudentController.createStudent);

router.delete("/:id", StudentController.deleteStudent);

router.patch("/:id", StudentController.updateStudent);

// when the router.<method> executes a controller 
// it will handle the parameters that are send to it
//  which are (req,res,next) if you read through the
//  express, i will be able to identify how the
//  funtion, executes.

module.exports = router;