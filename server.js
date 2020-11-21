var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local")
});

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.argv.length > 2 && process.argv[2] === "--prod") {
  app.use(express.static(path.join(__dirname, "dist")));
} else {
  const cors = require("cors");
  app.use(cors());
}

var authRouter = require("./routes/auth");
var apiRouter = require("./routes/api");

app.use("/auth", authRouter(express));
app.use("/api", apiRouter(express, connection));

module.exports = app;
