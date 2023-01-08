const express = require("express");
const {
  registerAdmin,
  registerUser,
  loginUser,
  getUser,
  forgetPassword,
  resetPassword,
} = require("../controllers/Authentication");

const router = express.Router();

router.route("/").get(getUser);

router.route("/register").post(registerAdmin);

router.route("/register-user").post(registerUser);

router.route("/login").post(loginUser);

router.route("/reset-password").put(resetPassword);

router.route("/forgot-password").post(forgetPassword);

module.exports = router;
