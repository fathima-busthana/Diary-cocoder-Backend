const dotenv = require("dotenv");
const authrouter = require("./routes/authRoute");
const mongoose = require("mongoose");
const app = require("./server");
const express = require("express");
const appError = require("./utils/appError");

//express config settings
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to database");
  } catch (e) {
    console.log("error connecting to database");
  }
};

connectDB();

//routes//
app.use("/api", authrouter);

//////////

app.get("/", (req, res) => {
  res.send(
    "<div style='height:100vh; display:grid; place-items:center;>\n<h1 style='color:red; font-size:100px; '>Diary-App Api</h1></div>"
  );
});

//error handler for
app.all("*", (req, res, next) => {
  next(new appError("page not found"), 404);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
