module.exports = (express, db) => {
  var router = express.Router();

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM compliancy`;
    db.query(sql, (err, result) => {
      if (err) {
        res.json({
          code: 204,
          msg: "error"
        });
        console.log(err);
      } else {
        res.json({
          code: 200,
          data: result
        });
      }
    });
  });

  return router;
};
