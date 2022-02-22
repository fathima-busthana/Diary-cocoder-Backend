const users = require("../model/user");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//signup function
exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new appError("password mismatch", 401));
  }
  const response = await users.create({
    username: username,
    email: email,
    password: password,
  });
  res.status(200).json({
    ok: true,
    data: response,
  });
  //   next();
});
