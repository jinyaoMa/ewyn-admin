module.exports = (express, db) => {
  var router = express.Router();

  router.get("/delete/:id", function (req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const sql = `DELETE FROM compliancy WHERE compliancyid = ${parseInt(
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
            const sql = `SELECT * FROM compliancy`;
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
        const compliancy_name = req.body.compliancy_name;
        const compliancyid = req.body.compliancyid;
        const sql = `UPDATE compliancy SET compliancy_name = ? WHERE compliancyid = ?`;
        const values = [compliancy_name, parseInt(compliancyid)];
        db().query(sql, values, (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM compliancy`;
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
        const compliancy = req.body.compliancy;
        const sql = `INSERT INTO compliancy (compliancy_name) VALUES ?`;
        const values = [[compliancy]];
        db().query(sql, [values], (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM compliancy`;
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.get("/all", function (req, res, next) {
    const sql = `SELECT * FROM compliancy`;
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

  return router;
};
