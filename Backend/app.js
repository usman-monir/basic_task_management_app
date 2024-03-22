const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

dotenv.config({ path: "./.env" });

app.use(express.static(path.join(__dirname, "public")));

// DEV TOOL TO DISPLAY CURRENT REQUEST URL
app.use(morgan("dev"));
app.use(compression());

// USE CORS
app.use(cors());

// BODY PARSER TO GET DATA FROM DB IN JSON FORM
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// COOKIE PARSER
app.use(cookieParser());

module.exports = app;
