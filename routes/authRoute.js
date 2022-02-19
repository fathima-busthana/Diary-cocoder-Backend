const express = require("express");
const router = express.Router();
const usersCreate = require("../Auth/auth");
router.route("/auth").get(usersCreate.createUser);

module.exports = router;
