const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ms = require('ms');

exports.generateToken = function (id) {
  return jwt.sign({ id }, process.env.JSON_WEB_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.sendTokenViaCookie = function (user, statusCode, res) {
  try {
    const token = this.generateToken(user.insertId || user.email);
    const cookieOpt = {
      expires: new Date(
        Date.now() + ms(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true, //by this cookie cannot be access or modified on the browser
    };
    if (process.env.NODE_ENV === "production") cookieOpt.secure = true; //this sends cookies only on https,
    res.cookie("jwt", token, cookieOpt);
    res.status(statusCode).json({
      status: "login successfull",
      token,
      user,
    });
  } catch (err) {
    console.log("err", err);
    res.status(404).json({
      status: "error",
      err,
    });
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.officer_role)) {
      return res.status(401).render("error", {
        user: req.user,
        msg: "You are not permitted to perform this action",
      });
    }
    next();
  };
};

exports.logout = (req, res) => {
  console.log("logout: ");
  res.cookie("jwt", null, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  return res.status(204).json({
    status: "sucess",
    data: null,
    mssg: "User logged out successfully"
  });
};

exports.encryptPassword = async (password) => await bcrypt.hash(password, 12);

exports.verifyPassword = async (candidatePassword, userPassword) =>
  await bcrypt.compare(candidatePassword, userPassword);

exports.createPasswordResetToken = function () {
  const createToken = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(createToken)
    .digest("hex");
  const passwordTokenExpires = Date.now() + 10 * 60 * 1000;
  return { createToken, passwordTokenExpires, passwordResetToken };
};

exports.setChangedAtProperty = (passwordChangedAt) =>
  (passwordChangedAt = Date.now() - 1000);

exports.checkPasswordReset = function (jwtTimestamp, passwordChangedAt) {
  // console.log(jwtTimestamp, passwordChangedAt);
  if (passwordChangedAt) {
    const changedAt = parseInt(passwordChangedAt / 1000, 10);
    return jwtTimestamp < changedAt;
  }
  return false;
};

exports.encryptToken = (resetToken) =>
  crypto.createHash("sha256").update(resetToken).digest("hex");
