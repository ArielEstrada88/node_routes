// This is a MAP that tells EXPRESS
// "Okay, if anyone hits (/auth/home),
//  use this function to handle it."

//Routes that exist here /home,
// /protected, /register...
// all of these point to a function
// in my authController.js(file)

// S i m p l y___P u t:
// "In this file im the "Manager" telling people
// where to go."

const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const awesomeFunction = (req, res, next) => {
  res.send("Hello World!");
};

const tooeleTechFunction = (Req, res, next) => {
  res.json("Tooele Tech is Awesome!");
  // console.log(res);
};

//GET All students
const getAllStudents = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("students").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET single student
const getSingleStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    console.log(req);
    const result = await mongodb
      .getDb()
      .db()
      .collection("students")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Create One Student
const createStudent = async (req, res) => {
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };
    console.log(req.body);

    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .insertOne(student);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while creating the student."
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// update one student
const updateStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      age: req.body.age,
      currentCollege: req.body.currentCollege,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .replaceOne({ _id: userId }, student);
    if (response.acknowledged) {
      res.status(204).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while updating the student."
        );  
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete One Student
const deleteStudent = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("students")
      .deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.acknowledged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports = { awesomeFunction, tooeleTechFunction, getAllStudents, getSingleStudent, createStudent, updateStudent, deleteStudent };