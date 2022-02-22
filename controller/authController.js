const users = require("../model/user");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

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
