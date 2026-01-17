// A u t h____D e p a r t m e n t

//Here in this file it is answering requests
//exclusively /auth requests


const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Login route
router.post("/login", authController.login);

// Protected route
const protectedRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ message: "Invalid token" });
    }
};

router.get("/protected", protectedRoute, (req, res) => {
    res.json({ message: "Protected content", user: req.user });
});

router.post("/register", authController.register);

module.exports = router;


