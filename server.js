var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fs = require("fs");
var getPathInfo = (p) => path.parse(p);

var dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local")
});

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) throw err;
  console.log("mysql connncted success!");
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

/**
 * @description // 递归读取文件，类似于webpack的require.context()
 * @time 2020-9-12
 *
 * @param {String} directory 文件目录
 * @param {Boolean} useSubdirectories 是否查询子目录，默认false
 * @param {array} extList 查询文件后缀，默认 ['.js']
 *
 */
function autoLoadFile(directory, useSubdirectories = false, extList = [".js"]) {
  const filesList = [];
  // 递归读取文件
  function readFileList(directory, useSubdirectories, extList) {
    const files = fs.readdirSync(directory);
    files.forEach((item) => {
      const fullPath = path.join(directory, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory() && useSubdirectories) {
        readFileList(path.join(directory, item), useSubdirectories, extList);
      } else {
        const info = getPathInfo(fullPath);
        extList.includes(info.ext) && filesList.push(fullPath);
      }
    });
  }
  readFileList(directory, useSubdirectories, extList);
  // 生成需要的对象
  const res = filesList.map((item) => ({
    path: item,
    data: require(item),
    ...getPathInfo(item)
  }));

  return res;
}

// Auth
app.use(function(req, res, next) {
  next();
});

// Business
const files = autoLoadFile(path.join(__dirname, "./routes"));
files.forEach((file) => {
  if (file.path.endsWith("index.js")) return;
  app.use(
    "/api/" + file.base.replace(/(\.\/|\.js)/g, ""),
    file.data(express, connection)
  );
});

module.exports = app;
