const app = require("./server");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const appError = require("./utils/appError");
const authrouter = require("./routes/authRoute");

//express config settings
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./.env" });

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
//for authentication
app.use("/api", authrouter);

//////////
// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

app.get("/", (req, res) => {
  res.send(
    "<div style='height:100vh; display:grid; place-items:center;>\n<h1 style='color:red; font-size:100px; '>Diary-App Api</h1></div>"
  );
});

//error handler for
// all = get,post,etc etc requests
app.all("*", (req, res, next) => {
  next(
    new appError(`The requested page ${req.originalUrl} was not found`),
    404
  );
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    ok: false,
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
