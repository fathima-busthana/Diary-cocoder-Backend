const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: "string",
    valdate: [validator.isEmail, "email is required"],
    required: [true, "user should have a email"],
    unique: true,
  },
  password: {
    required: [true, "password is required"],
    minLength: 8,
    type: "string",
    select: false,
  },
  passwordConfirm: {
    type: "string",
    minLength: 8,
    required: [true, "please confirm your password"],
    valdate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same",
    },
  },
});
//adding password and username field
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

//a method to compare password
userSchema.methods.correctPassword = async function (candPAss, userPass) {
  return await bcrypt.compare(candPAss, userPass);
};

const user = mongoose.model("User", userSchema);
module.exports = user;
