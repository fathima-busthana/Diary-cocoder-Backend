const mongoose = require("mongoose");
const passLocal = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: [true, "user should have a email"],
    unique: true,
  },
});
//adding password and username field
userSchema.plugin(passLocal);

const user = mongoose.model("User", userSchema);
module.exports = user;
