const app = require("../server");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("../model/user");
const session = require("express-session");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.createUser = async (req, res, next) => {
  try {
    const users = new user({ email: "hari@gmail.com", username: "hari" });
    const newUser = await user.register(users, "chicken");
    res.send(newUser);
    console.log("from api");
  } catch (err) {}
};
