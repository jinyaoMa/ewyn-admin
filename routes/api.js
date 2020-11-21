module.exports = (express, db) => {
  var router = express.Router();

  router.get("/programlist", function(req, res, next) {
    const list = require("../datas/ProgramList");
    res.json(list);
  });

  router.get("/productlist", function(req, res, next) {
    const list = require("../datas/Productlist");
    res.json(list);
  });

  router.get("/customerlist", function(req, res, next) {
    const list = require("../datas/Customerlist");
    res.json(list);
  });

  return router;
};
