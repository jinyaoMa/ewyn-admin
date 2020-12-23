const moment = require("moment");

module.exports = (express, db) => {
  var router = express.Router();

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM purchase a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1`;
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
    const sql = `SELECT * FROM purchase a
    INNER JOIN customer c ON c.customerid = a.customerid
    INNER JOIN product p ON p.productid = a.productid
    WHERE c.actived = 1 AND a.customerid = ${parseInt(
      req.params.id
    )} ORDER BY week, due_date ASC`;
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

  router.post("/add", function(req, res, next) {
    console.log(req.body);
    try {
      const week = req.body.week;
      const product = req.body.product;
      const dueDate = req.body.dueDate;
      const soldDate = req.body.soldDate;
      const customerid = req.body.customerid;
      const sql = `INSERT INTO purchase
      (week, productid, due_date, sold_date, customerid)
      VALUES ?`;
      const values = [
        [
          parseInt(week),
          parseInt(product),
          moment(dueDate).format("YYYY-MM-DD"),
          moment(soldDate).format("YYYY-MM-DD"),
          parseInt(customerid)
        ]
      ];
      db.query(sql, [values], (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM purchase a
          INNER JOIN customer c ON c.customerid = a.customerid
          INNER JOIN product p ON p.productid = a.productid
          WHERE c.actived = 1 AND a.customerid = ${parseInt(
            customerid
          )} ORDER BY week, due_date ASC`;
          db.query(sql, (err1, result1) => {
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

  router.post("/edit", function(req, res, next) {
    console.log(req.body);
    try {
      const week = req.body.week;
      const product = req.body.product;
      const dueDate = req.body.dueDate;
      const soldDate = req.body.soldDate;
      const customerid = req.body.customerid;
      const purchaseid = req.body.purchaseid;
      const sql = `UPDATE purchase SET week = ?,
      productid = ?,
      due_date = ?,
      sold_date = ?
      WHERE customerid = ? AND purchaseid = ?`;
      const values = [
        parseInt(week),
        parseInt(product),
        moment(dueDate).format("YYYY-MM-DD"),
        moment(soldDate).format("YYYY-MM-DD"),
        parseInt(customerid),
        parseInt(purchaseid)
      ];
      db.query(sql, values, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM purchase a
          INNER JOIN customer c ON c.customerid = a.customerid
          INNER JOIN product p ON p.productid = a.productid
          WHERE c.actived = 1 AND a.customerid = ${parseInt(
            customerid
          )} ORDER BY week, due_date ASC`;
          db.query(sql, (err1, result1) => {
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

  router.post("/delete/:id", function(req, res, next) {
    console.log(req.body);
    try {
      const customerid = req.body.customerid;
      const sql = `DELETE FROM purchase WHERE purchaseid = ${parseInt(
        req.params.id
      )}`;
      db.query(sql, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM purchase a
          INNER JOIN customer c ON c.customerid = a.customerid
          INNER JOIN product p ON p.productid = a.productid
          WHERE c.actived = 1 AND a.customerid = ${parseInt(
            customerid
          )} ORDER BY week, due_date ASC`;
          db.query(sql, (err1, result1) => {
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
