const express = require("express");
const passport = require("passport");
const router = express.Router();
const logIn = require("../controller/authController");
const { createUser } = require("../Auth/auth");
router.route("/auth").post(createUser);
router.route("/login").post(logIn.auth);

module.exports = router;
