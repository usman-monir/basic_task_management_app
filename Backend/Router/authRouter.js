const express = require("express");
const auth = require("../Controller/oAuth");
const authController = require("../Controller/authFormController");


const router = express.Router();

router.post("/login", auth.login);
router.post("/signup", auth.signUp);
router.post("/forget-password", auth.forgetPassword);
router.patch("/reset-password/:token", auth.resetPassword);
router.route("/logout").get(authController.logout);


module.exports = router;
