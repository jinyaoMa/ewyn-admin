const moment = require("moment");

module.exports = (express, db) => {
  var router = express.Router();

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM customer WHERE actived = 1`;
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

  router.get("/phone", function(req, res, next) {
    const sql = `SELECT customerid, CONCAT(first_name, ' ', last_name) as name, telephone FROM customer WHERE actived = 1`;
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
      db.query(sql, values, (err, result) => {
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
      const recommend = req.body.recommend;
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
          parseInt(product),
          parseInt(recommend)
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
          const sql = `SELECT * FROM customer WHERE actived = 1`;
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
      const recommend = req.body.recommend;
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
        parseInt(product),
        parseInt(recommend),
        parseInt(customerid)
      ];
      db.query(sql, values, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM customer WHERE actived = 1`;
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

  router.get("/deactivate/:id", function(req, res, next) {
    try {
      const sql = `UPDATE customer SET actived = 0 WHERE customerid = ${parseInt(req.params.id)}`;
      db.query(sql, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM customer WHERE actived = 1`;
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
