const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const flash = require("connect-flash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(flash());
const morgan = require("morgan");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// cors config settings
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const sessionConfig = {
  secret: "thisisthekey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

if (process.env.NODE_ENV !== "production") {
  app.use(session(sessionConfig));
}

module.exports = app;
