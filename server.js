// --------------------------------------------------
 

/* Foundational file of the app in order */

/* for the API to work, AT ALL.  */

// ____T H I S___I S
// __C o m p a n y___H Q__

// setting all of it, everything up.
// --------------------------------------------------

const express = require("express");
const cors = require("cors");
const mongodb = require("./db/connect");
const authRoutes = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 3000;

app
.use(cors())
.use(express.json())
.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})
.use("/", require("./routes"))
.use("/auth", authRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
    console.log(
      "\x1b[34m%s\x1b[0m",
      `Connected to DB and listening on ${PORT}`
    );
  }
});