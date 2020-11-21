module.exports = (express, db) => {
  var router = express.Router();

  router.get("/", function(req, res, next) {
    res.send("/auth");
  });

  return router;
};
