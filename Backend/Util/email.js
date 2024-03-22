const path = require("path");
const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");

const sendEmail = async function (option) {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: process.env.MAILE_PORT,
    auth: {
      user: process.env.MAILE_USER,
      pass: process.env.MAILE_PASSWORD,
    },
  });
  //reference the plugin
  const handlebarsOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
    extName: ".handlebars",
  };
  //attach the plugin to the nodemailer transporter
  transport.use("compile", hbs(handlebarsOptions));
  //send mail with options

  // --------------------------------

  const mailOpt = {
    from: "Faizan Mustafa",
    to: option.email,
    subject: `It's your password reset token (valid for 10min)`,
    template: "resetPasswordTemp",
    context: {
      target: "http://127.0.0.1:3000/reset-password",
      token: option.token,
    },
  };
  await transport.sendMail(mailOpt);
};

module.exports = sendEmail;
