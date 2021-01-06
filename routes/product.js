module.exports = (express, db) => {
  var router = express.Router();

  router.get("/delete/:id", function (req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const sql = `DELETE FROM product WHERE productid = ${parseInt(
          req.params.id
        )}`;
        db(sql, (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM product`;
            db(sql, (err1, result1) => {
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.post("/edit", function (req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const product_name = req.body.product_name;
        const optional = req.body.optional;
        const productid = req.body.productid;
        const sql = `UPDATE product SET product_name = ?, optional = ? WHERE productid = ?`;
        const values = [product_name, parseInt(optional), parseInt(productid)];
        db(sql, values, (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM product`;
            db(sql, (err1, result1) => {
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.post("/add", function (req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const name = req.body.name;
        const option = req.body.option;
        const sql = `INSERT INTO product (product_name, optional) VALUES ?`;
        const values = [[name, parseInt(option)]];
        db(sql, [values], (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM product`;
            db(sql, (err1, result1) => {
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.get("/all", function (req, res, next) {
    const sql = `SELECT * FROM product`;
    db(sql, (err, result) => {
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
