// This is a MAP that tells EXPRESS
// "Okay, if anyone hits (/auth/home),
//  use this function to handle it."

//Routes that exist here /home,
// /protected, /register...
// all of these point to a function
// in my authController.js(file)

// S i m p l y___P u t:
// "In this file im the "conductor" telling people
// where to go."


require("dotenv").config();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); /*.   THESE ARE IMPORTS  */
const SECRET_KEY = process.env.JWT_SECRET;
const mongodb = require("../db/connect");

const generateToken = (user) => {
    return jwt.sign(
      {
        fullName: user.fullName,
        userType: user.userType,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
};


// METHODS ARE HERE
const home = (req, res) => {             /* Home- */
    res.send("Welcome to the home page"); /*Page*/
}; 

const register = async (req, res) => {
    res.send("Welcome to the register page"); // Send welcome message

    const { fullName, email, password, userType } = req.body;  //Fieldnames
                                                               //are exactly the
                                                               //the same in ChatGPT
    try {
        // Check if required fields are provided
        if (!fullName || !email || !password || !userType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists in the database
        const db = mongodb.getDb().db();
        const existingUser = await db.collection("users").findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            fullName,
            email,
            password: hashedPassword,
            userType,
            createdAt: new Date(),
        };

        // Insert the new user into the database
        const result = await db.collection("users").insertOne(newUser);

        if (!result.acknowledged) {
            throw new Error("Failed to create user");
        }

        // Generate a token for the new user
        const token = generateToken(newUser);

        // Return a success response with the user and token
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: result.insertedId,
                fullName: newUser.fullName,
                email: newUser.email,
                userType: newUser.userType,
            },
        });

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = mongodb.getDb().db();

        const user = await db.collection("users").findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                userType: user.userType
            }
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
};


const logout = (req, res) => {              /* Logout */
    res.clearCookie("token");               // Remove auth token
    res.status(200).json({
        message: "Logged out successfully"  /* Page response */
    });
};

// const protected= (req, res) => {    /* Protected- */
//     res                              /*Page*/
//       .clearCookie("token");
//     res
//       .status(200)
//       .json(
//         { message: "Logged out successfully" }
//     );
// };

const protected = (req, res) => {
    res.status(200).json(
        { message: "Protected content",
          user: req.user
        })
};

module.exports = { home, register, login, logout, protected};