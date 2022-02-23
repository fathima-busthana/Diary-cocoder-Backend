const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const diaryControl = require("../controller/diaryController");

router.route("/auth/signup").post(authController.signUp);
router.route("/auth/login").post(authController.login);
router
  .route("/diary/:id")
  .get(diaryControl.getAllDiary)
  .post(diaryControl.createDiary);

module.exports = router;
