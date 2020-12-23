module.exports = (express, db) => {
  var router = express.Router();

  router.get("/delete/:id", function(req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const sql = `DELETE FROM program WHERE programid = ${parseInt(
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
            const sql = `SELECT * FROM program`;
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.post("/edit", function(req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const program_name = req.body.program_name;
        const programid = req.body.programid;
        const sql = `UPDATE program SET program_name = ? WHERE programid = ?`;
        const values = [program_name, parseInt(programid)];
        db.query(sql, values, (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM program`;
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.post("/add", function(req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const program = req.body.program;
        const sql = `INSERT INTO program (program_name) VALUES ?`;
        const values = [[program]];
        db.query(sql, [values], (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT * FROM program`;
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM program`;
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
