require("dotenv").config();

console.log("MONGO_URI:", process.env.MONGO_URI);


const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//     |   Connects to MongoDB
//     V
connectDB();

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
