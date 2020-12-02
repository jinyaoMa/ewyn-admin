module.exports = (express, db) => {
  var router = express.Router();

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1`;
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

  router.get("/customer/:id", function(req, res, next) {
    const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${req.params.id}`;
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
