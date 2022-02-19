const express = require("express");
const app = express();
const session = require("express-session");

app.use(express.json());

const morgan = require("morgan");
const cors = require("cors");

app.use(morgan("dev"));

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

app.use(session(sessionConfig));

module.exports = app;
