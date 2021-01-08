const moment = require("moment");

module.exports = (express, db) => {
  var router = express.Router();

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM customer WHERE actived = 1`;
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

  router.get("/id/:id", function(req, res, next) {
    try {
      const sql = `SELECT * FROM customer WHERE actived = 1 AND customerid = ${parseInt(
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
          res.json({
            code: 200,
            data: result
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/phone", function(req, res, next) {
    const sql = `SELECT customerid, CONCAT(first_name, ' ', last_name) as name, telephone FROM customer WHERE actived = 1`;
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

  router.post("/search", function(req, res, next) {
    console.log(req.body);
    try {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const telephone = req.body.telephone;
      const email = req.body.email;
      const sql = `SELECT * FROM customer WHERE actived = 1
      AND first_name LIKE ? AND last_name LIKE ? AND telephone LIKE ? AND email LIKE ?`;
      const values = [
        `%${firstname}%`,
        `%${lastname}%`,
        `%${telephone}%`,
        `%${email}%`
      ];
      db(sql, values, (err, result) => {
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
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/add", function(req, res, next) {
    console.log(req.body);
    try {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const telephone = req.body.telephone;
      const goalDate = req.body.goalDate;
      const email = req.body.email;
      const reason = req.body.reason;
      const startDate = req.body.startDate;
      const startWeight = req.body.startWeight;
      const goalWeight = req.body.goalWeight;
      const program = req.body.program;
      const product = req.body.product;
      if (!/^[0-9,]*$/.test(product)) {
        throw new Error("product format error");
      }
      const recommend = req.body.recommend;
      if (!/^[0-9,]*$/.test(recommend)) {
        throw new Error("recommend format error");
      }
      const sql = `INSERT INTO customer
      (first_name, last_name, telephone, goal_date, email, reason, start_date, start_weight, goal_weight, programid, productid, recommend)
      VALUES ?`;
      const values = [
        [
          firstname,
          lastname,
          telephone,
          moment(goalDate).format("YYYY-MM-DD"),
          email,
          reason,
          moment(startDate).format("YYYY-MM-DD"),
          parseFloat(startWeight),
          parseFloat(goalWeight),
          parseInt(program),
          product,
          recommend
        ]
      ];
      db(sql, [values], (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM customer WHERE actived = 1`;
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
  });

  router.post("/edit", function(req, res, next) {
    console.log(req.body);
    try {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const telephone = req.body.telephone;
      const goalDate = req.body.goalDate;
      const email = req.body.email;
      const reason = req.body.reason;
      const startDate = req.body.startDate;
      const startWeight = req.body.startWeight;
      const goalWeight = req.body.goalWeight;
      const program = req.body.program;
      const product = req.body.product;
      if (!/^[0-9,]*$/.test(product)) {
        throw new Error("product format error");
      }
      const recommend = req.body.recommend;
      if (!/^[0-9,]*$/.test(recommend)) {
        throw new Error("recommend format error");
      }
      const customerid = req.body.customerid;
      const sql = `UPDATE customer SET first_name = ?,
      last_name = ?,
      telephone = ?,
      goal_date = ?,
      email = ?,
      reason = ?,
      start_date = ?,
      start_weight = ?,
      goal_weight = ?,
      programid = ?,
      productid = ?,
      recommend = ?
      WHERE customerid = ?`;
      const values = [
        firstname,
        lastname,
        telephone,
        moment(goalDate).format("YYYY-MM-DD"),
        email,
        reason,
        moment(startDate).format("YYYY-MM-DD"),
        parseFloat(startWeight),
        parseFloat(goalWeight),
        parseInt(program),
        product,
        recommend,
        parseInt(customerid)
      ];
      db(sql, values, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM customer WHERE actived = 1`;
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
  });

  router.get("/deactivate/:id", function(req, res, next) {
    try {
      const sql = `UPDATE customer SET actived = 0 WHERE customerid = ${parseInt(
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
          const sql = `SELECT * FROM customer WHERE actived = 1`;
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
  });

  return router;
};
