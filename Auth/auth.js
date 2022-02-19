const app = require("../server");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const wrapAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const user = require("../model/user");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const users = new user({ email: email, username: username });
    const newUser = await user.register(users, password);
    res.status(201).json({
      ok: true,
      res: newUser,
    });
    console.log("from api");
  } catch (err) {
    res.status(404).json({
      ok: false,
      res: err,
    });
  }
};

// exports.createUser = wrapAsync(async (req, res) => {
//   try {
//     const { email, password, username } = req.body;
//     const users = new user({ email: email, username: username });
//     const newUser = await user.register(users, password);
//     res.status(201).json({
//       ok: true,
//       res: newUser,
//     });
//     console.log("from api");
//   } catch (err) {
//     res.status(404).json({
//       ok: false,
//       res: err,
//     });
//   }
// });
