const moment = require("moment");

module.exports = (express, db) => {
  var router = express.Router();

  router.post("/dateRange", function(req, res, next) {
    try {
      const customerid = req.body.customerid;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const sql = `SELECT * FROM measurement a INNER JOIN customer c ON c.customerid = a.customerid WHERE c.actived = 1 AND a.customerid = ${parseInt(
        customerid
      )} AND DATE_FORMAT(date,'%Y%m%d') BETWEEN ? AND ? ORDER BY date ASC`;
      db(
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

  router.get("/all", function(req, res, next) {
    const sql = `SELECT * FROM measurement m INNER JOIN customer c ON c.customerid = m.customerid WHERE c.actived = 1`;
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

  router.get("/customer/:id", function(req, res, next) {
    const sql = `SELECT * FROM measurement m INNER JOIN customer c ON c.customerid = m.customerid WHERE c.actived = 1 AND m.customerid = ${parseInt(
      req.params.id
    )} ORDER BY date DESC`;
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

  router.post("/add", function(req, res, next) {
    console.log(req.body);
    try {
      const date = req.body.date;
      const phcInitial = req.body.phcInitial;
      const weight = req.body.weight;
      const bustChest = req.body.bustChest;
      const waist = req.body.waist;
      const midSection = req.body.midSection;
      const hips = req.body.hips;
      const rightArm = req.body.rightArm;
      const rightThigh = req.body.rightThigh;
      const customerid = req.body.customerid;
      const sql = `INSERT INTO measurement
      (date, phc_initial, weight, bust_chest, waist, mid_section, hips, right_arm, right_thigh, customerid)
      VALUES ?`;
      const values = [
        [
          moment(date).format("YYYY-MM-DD"),
          phcInitial,
          parseFloat(weight),
          parseFloat(bustChest),
          parseFloat(waist),
          parseFloat(midSection),
          parseFloat(hips),
          parseFloat(rightArm),
          parseFloat(rightThigh),
          parseInt(customerid)
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
          const sql = `SELECT * FROM measurement m INNER JOIN customer c ON c.customerid = m.customerid WHERE c.actived = 1 AND m.customerid = ${parseInt(
            customerid
          )} ORDER BY date DESC`;
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
      const date = req.body.date;
      const phcInitial = req.body.phcInitial;
      const weight = req.body.weight;
      const bustChest = req.body.bustChest;
      const waist = req.body.waist;
      const midSection = req.body.midSection;
      const hips = req.body.hips;
      const rightArm = req.body.rightArm;
      const rightThigh = req.body.rightThigh;
      const customerid = req.body.customerid;
      const measurementid = req.body.measurementid;
      const sql = `UPDATE measurement SET date = ?,
      phc_initial = ?,
      weight = ?,
      bust_chest = ?,
      waist = ?,
      mid_section = ?,
      hips = ?,
      right_arm = ?,
      right_thigh = ?
      WHERE customerid = ? AND measurementid = ?`;
      const values = [
        moment(date).format("YYYY-MM-DD"),
        phcInitial,
        parseFloat(weight),
        parseFloat(bustChest),
        parseFloat(waist),
        parseFloat(midSection),
        parseFloat(hips),
        parseFloat(rightArm),
        parseFloat(rightThigh),
        parseInt(customerid),
        parseInt(measurementid)
      ];
      db(sql, values, (err, result) => {
        if (err) {
          res.json({
            code: 204,
            msg: "error"
          });
          console.log(err);
        } else {
          const sql = `SELECT * FROM measurement m INNER JOIN customer c ON c.customerid = m.customerid WHERE c.actived = 1 AND m.customerid = ${parseInt(
            customerid
          )} ORDER BY date DESC`;
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

  router.post("/delete/:id", function(req, res, next) {
    console.log(req.body);
    try {
      const customerid = req.body.customerid;
      const sql = `DELETE FROM measurement WHERE measurementid = ${parseInt(
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
          const sql = `SELECT * FROM measurement m INNER JOIN customer c ON c.customerid = m.customerid WHERE c.actived = 1 AND m.customerid = ${parseInt(
            customerid
          )} ORDER BY date DESC`;
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
