const users = require("../model/user");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

//function to crate jwt token for
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//signup function
exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  const response = await users.create({
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
  });
  //creating jwt token
  const token = createToken(response._id);
  res.status(200).json({
    ok: true,
    data: response,
    token,
  });
  //   next();
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("no email or password provided", 401));
  }
  const member = await users.findOne({ email: email }).select("+password");

  //compare the password with db
  //correctpassword is a method in users schema
  if (!member || !(await member.correctPassword(password, member.password))) {
    return next(new appError("please provide a valid email or password", 401));
  }
  const tooken = createToken(member._id);
  res.status(201).json({
    ok: true,
    token: token,
  });
});
