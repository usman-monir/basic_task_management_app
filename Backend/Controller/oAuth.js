const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const connection = require("../server");
const authControl = require("./authFormController");
const sendEmail = require("../util/email");

// TODO: AUTHENTICATION-------------------------------------------
// ? PROTECTING ROUTES--------------------------------
exports.protectingRoutes = async (req, res, next) => {
  let token = "";
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token)
    return res.status(401).render("error", {
      status: "fail",
      message: "You are not logged in, Please login first",
    });
  // TODO: verify token
  let decoded = null;
  try {
    decoded = await promisify(jwt.verify)(
      token,
      process.env.JSON_WEB_TOKEN_SECRET
    );
  } catch (err) {
    return res.status(401).render("error", {
      status: "fail",
      message: "You are not logged in, Please login first",
    });
  }
  // TODO: check user still exist
  const queryString = `SELECT * FROM user WHERE id = ${decoded.id}`;
  connection.query(queryString, function (err, results) {
    if (err || results.length === 0)
      return res.status(404).render("error", {
        status: "fail",
        message: "User does not exist",
      });
    // TODO: check if user changed his password
    if (
      authControl.checkPasswordReset(
        decoded.iat,
        results[0].password_changed_at
      )
    ) {
      return res.status(401).render("error", {
        status: "fail",
        message: "You changed your password,Please login again with new password",
      });
    }
    req.user = results[0];
    next();
  });
};

// ? SIGN UP------------------------------
exports.signUp = async (req, res) => {

  const user = {
    username: req.body.username, email: req.body.email, password: req.body.password
  };
  // *encrypting password
  user.password = await authControl.encryptPassword(user.password);

  const queryStr = `
      SELECT * FROM user
      WHERE email = '${user.email}'`;

  connection.query(queryStr, function (err, results) {
    if (err) {
      console.log("❗❗❗ error", err, "❗❗❗");
      return res.status(400).json({
        status: "fail",
        message: `Something went wrong`,
        err
      });
    }
    if ( results.length > 0)
    {
      console.log("❗ result", results, "❗");
      return res.status(400).json({
        status: "fail",
        message: `User already exists`,
      });
    }
    if (results.length == 0) {
      const queryString = `
        INSERT INTO user(username, email, password) VALUES ('${user.username}' , '${user.email}', '${user.password}')`;

      connection.query(queryString, function (err, results) {
        if (err)
          {
            return res.status(400).json({
            status: "error",
            message: "Something went wrong while inserting user into database",
            err
          });
        }
        authControl.sendTokenViaCookie(results, 201, res);
      });
    }
  });
};

// ? LOGIN--------------------------------------
exports.login = (req, res) => {
  const { email, password } = req.body;
  const queryString = `
      SELECT * FROM user
      WHERE email = '${email}'`;

  connection.query(queryString, async function (err, results) {
    if (
      err ||
      results.length === 0 ||
      ( results.length && !( await authControl.verifyPassword(password, results[0].password)))
    )
    {
        return res.status(401).json({
        status: "error",
        message: "Email or password incorrect",
        err,
      });
    }
    console.log("result on login: " + results[0]);
    authControl.sendTokenViaCookie(results[0], 200, res);
    req.user = results[0];
  });
};

// ? FORGET PASSWORD----------------------------------------
exports.forgetPassword = (req, res, next) => {
  const { email } = req.body;

  const queryString = `SELECT * FROM officers WHERE email = '${email}'`;

  connection.query(queryString, async function (err, results) {
    if (err || !results[0])
      return res.status(404).json({
        status: "error",
        message: "User of this email doesn't exists",
      });

    const user = results[0];

    const resetData = authControl.createPasswordResetToken();

    const queryStr = `UPDATE officers SET password_reset_token = '${resetData.passwordResetToken}', password_token_expires = ${resetData.passwordTokenExpires} WHERE id = '${user.id}'`;

    connection.query(queryStr, async function (err, results) {
      if (err) throw err;

      const urlSend = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/reset-password/${resetData.createToken}`;

      const message = `Forgot your password ? don't worry hit this url ${urlSend}.Thanks to being part of our community.`;

      await sendEmail({
        email,
        message,
        token: resetData.createToken,
      });

      res.status(200).json({
        status: "sucess",
        message: "Token has been sent sucessfully",
      });
    });
  });
};

// ? RESET PASSWORD---------------------------------------
exports.resetPassword = (req, res, next) => {
  let { newPassword } = req.body;
  const userToken = authControl.encryptToken(req.params.token);

  const queryString = `
      SELECT * FROM officers
      WHERE password_reset_token = '${userToken}' AND password_token_expires >= '${Date.now()}'`;

  connection.query(queryString, async function (err, results) {
    const user = results[0];

    if (err || !user)
      return res.status(401).json({
        status: "fail",
        message: "Your token has expired or Invalid Token",
      });

    newPassword = await authControl.encryptPassword(newPassword);

    const queryStr = `UPDATE officers SET officer_password = '${newPassword}', password_reset_token = ${null} , password_token_expires = ${null}, password_changed_at = ${authControl.setChangedAtProperty()} WHERE id = ${
      user.id
    }`;

    connection.query(queryStr, (err, results) => {
      if (err)
        return res.status(409).json({
          status: "fail",
          err,
        });
      authControl.sendTokenViaCookie(user, 200, res);
    });
  });
};
