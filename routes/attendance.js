const moment = require("moment");

module.exports = (express, db) => {
  var router = express.Router();

  router.get("/all", function (req, res, next) {
    const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1`;
    db().query(sql, (err, result) => {
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

  router.get("/date/count", function (req, res, next) {
    const sql = `SELECT date, COUNT(*) as count FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 GROUP by date`;
    db().query(sql, (err, result) => {
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

  router.get("/customer/:id", function (req, res, next) {
    const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${parseInt(
      req.params.id
    )} ORDER BY date DESC`;
    db().query(sql, (err, result) => {
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

  router.post("/dateRange", function (req, res, next) {
    try {
      const customerid = req.body.customerid;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${parseInt(
        customerid
      )} AND DATE_FORMAT(date,'%Y%m%d') BETWEEN ? AND ? ORDER BY date ASC`;
      db().query(
        sql,
        [
          moment(startDate).format("YYYYMMDD"),
          moment(endDate).format("YYYYMMDD")
        ],
        (err, result) => {
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
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/add", function (req, res, next) {
    console.log(req.body);
    try {
      const date = req.body.date;
      const weight = req.body.weight;
      const product = req.body.product;
      const cardio = req.body.cardio;
      const comment = req.body.comment;
      const dtr = req.body.dtr;
      const customerid = req.body.customerid;
      const sql = `INSERT INTO attendance
      (date, weight, cardio, comment, due_to_return, compliancyid, customerid)
      VALUES ?`;
      const values = [
        [
          moment(date).format("YYYY-MM-DD"),
          parseFloat(weight),
          cardio,
          comment,
          moment(dtr).format("YYYY-MM-DD"),
          parseInt(product),
          parseInt(customerid)
        ]
      ];
      db().query(sql, [values], (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${parseInt(
            customerid
          )} ORDER BY date DESC`;
          db().query(sql, (err1, result1) => {
            if (err1) {
              res.json({
                code: 204,
                msg: "error"
              });
              console.log(err1);
            } else {
              res.json({
                code: 200,
                affectedRows: result.affectedRows,
                data: result1
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/edit", function (req, res, next) {
    console.log(req.body);
    try {
      const date = req.body.date;
      const weight = req.body.weight;
      const product = req.body.product;
      const cardio = req.body.cardio;
      const comment = req.body.comment;
      const dtr = req.body.dtr;
      const customerid = req.body.customerid;
      const attendanceid = req.body.attendanceid;
      const sql = `UPDATE attendance SET date = ?,
      weight = ?,
      cardio = ?,
      comment = ?,
      due_to_return = ?,
      compliancyid = ?
      WHERE customerid = ? AND attendanceid = ?`;
      const values = [
        moment(date).format("YYYY-MM-DD"),
        parseFloat(weight),
        cardio,
        comment,
        moment(dtr).format("YYYY-MM-DD"),
        parseInt(product),
        parseInt(customerid),
        parseInt(attendanceid)
      ];
      db().query(sql, values, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${parseInt(
            customerid
          )} ORDER BY date DESC`;
          db().query(sql, (err1, result1) => {
            if (err1) {
              res.json({
                code: 204,
                msg: "error"
              });
              console.log(err1);
            } else {
              res.json({
                code: 200,
                affectedRows: result.affectedRows,
                data: result1
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/delete/:id", function (req, res, next) {
    console.log(req.body);
    try {
      const customerid = req.body.customerid;
      const sql = `DELETE FROM attendance WHERE attendanceid = ${parseInt(
        req.params.id
      )}`;
      db().query(sql, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM attendance a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${parseInt(
            customerid
          )} ORDER BY date DESC`;
          db().query(sql, (err1, result1) => {
            if (err1) {
              res.json({
                code: 204,
                msg: "error"
              });
              console.log(err1);
            } else {
              res.json({
                code: 200,
                affectedRows: result.affectedRows,
                data: result1
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
