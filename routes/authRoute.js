const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.route("/auth/signup").post(authController.signUp);
router.route("/auth/login").post(authController.login);
module.exports = router;
