module.exports = (express, db) => {
  var router = express.Router();

  router.get("/programlist", function(req, res, next) {
    const list = require("../datas/ProgramList");
    res.json(list);
  });

  return router;
};
