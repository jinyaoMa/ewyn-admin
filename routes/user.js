const crypto = require("crypto");

module.exports = (express, db) => {
  var router = express.Router();

  router.get("/deactivate/:id", function(req, res, next) {
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      try {
        const sql = `UPDATE user SET actived = 0 WHERE userid = ${parseInt(
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
            const sql = `SELECT userid, name, first_name, last_name, startdate, permission FROM user WHERE actived = 1 ORDER BY startdate DESC`;
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
      console.log(req.body);
      try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const adminLevel = req.body.adminLevel;
        const userid = req.body.userid;
        const sql = `UPDATE user SET first_name = ?,
        last_name = ?,
        name = ?,
        permission = ?
        WHERE userid = ?`;
        const values = [
          firstname,
          lastname,
          username,
          `USER:1,ADMIN:${adminLevel}`,
          parseInt(userid)
        ];
        db.query(sql, values, (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT userid, name, first_name, last_name, startdate, permission FROM user WHERE actived = 1 ORDER BY startdate DESC`;
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
      console.log(req.body);
      try {
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        const adminLevel = req.body.adminLevel;
        const sql = `INSERT INTO user
        (first_name, last_name, name, permission)
        VALUES ?`;
        const values = [
          [firstname, lastname, username, `USER:1,ADMIN:${adminLevel}`]
        ];
        db.query(sql, [values], (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else {
            const sql = `SELECT userid, name, first_name, last_name, startdate, permission FROM user WHERE actived = 1 ORDER BY startdate DESC`;
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
    if (
      typeof req.permission === "string" &&
      req.permission.includes("ADMIN:-1")
    ) {
      const sql = `SELECT userid, name, first_name, last_name, startdate, permission FROM user WHERE actived = 1 ORDER BY startdate DESC`;
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
    } else {
      res.json({
        code: 204,
        msg: "error"
      });
    }
  });

  router.get("/logout/:id", function(req, res, next) {
    try {
      const sql = `UPDATE user SET access_token = '' WHERE userid = ? AND access_token = ?`;
      db.query(
        sql,
        [parseInt(req.params.id), req.signedCookies.access_token],
        (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else if (result.affectedRows === 1) {
            res.json({
              code: 200,
              status: "logout"
            });
          } else {
            res.json({
              code: 200,
              error: "userid/access_token"
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/auth/:id", function(req, res, next) {
    if (typeof req.signedCookies.access_token === "string") {
      try {
        const sql = `SELECT * FROM user WHERE actived = 1 AND userid = ${parseInt(
          req.params.id
        )} ORDER BY startdate DESC`;
        db.query(sql, (err, result) => {
          if (err) {
            res.json({
              code: 204,
              msg: "error"
            });
            console.log(err);
          } else if (
            result.length > 0 &&
            result[0].access_token === req.signedCookies.access_token
          ) {
            res.json({
              code: 200,
              status: "login",
              data: {
                userid: result[0].userid,
                name: result[0].name,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                permission: result[0].permission
              }
            });
          } else {
            res.json({
              code: 200,
              status: "logout"
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.json({
        code: 200,
        status: "logout"
      });
    }
  });

  router.post("/login", function(req, res, next) {
    const algorithm = "aes-256-cbc";
    const clearEncoding = "utf8";
    const cipherEncoding = "base64";
    try {
      const username = req.body.a;
      const encrypted = req.body.b;
      const key = req.body.c;
      const iv = req.body.d;

      const encTemp = encrypted.split("eWyn.");
      if (encTemp.length === 2) {
        const plainChunks = [];
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        encTemp.forEach((str) => {
          plainChunks.push(decipher.update(str, cipherEncoding, clearEncoding));
        });
        plainChunks.push(decipher.final(clearEncoding));
        const decrypted = JSON.parse(plainChunks.join(""));
        if (
          typeof decrypted.username === "string" &&
          typeof decrypted.password === "string" &&
          decrypted.username === username
        ) {
          const cipher = crypto.createCipheriv(
            algorithm,
            process.env.PASSWORD_KEY,
            process.env.PASSWORD_IV
          );
          const cipherChunks = [];
          cipherChunks.push(
            cipher.update(decrypted.password, clearEncoding, cipherEncoding)
          );
          cipherChunks.push(cipher.final(cipherEncoding));
          const encryptedPassword = cipherChunks.join("");

          const sql = `SELECT * FROM user WHERE name = ? AND actived = 1 ORDER BY startdate DESC`;
          db.query(sql, [username], (err, result) => {
            if (err) {
              res.json({
                code: 204,
                msg: "error"
              });
              console.log(err);
            } else if (result.length < 1) {
              res.json({
                code: 200,
                error: "username"
              });
            } else if (result[0].password === encryptedPassword) {
              const access_token = crypto
                .randomBytes(128)
                .toString("base64")
                .substr(0, 128);
              db.query(
                `UPDATE user SET access_token = ? WHERE userid = ?`,
                [access_token, result[0].userid],
                (err, _) => {
                  if (err) {
                    res.json({
                      code: 204,
                      msg: "error"
                    });
                    console.log(err);
                  } else {
                    res.cookie("userid", result[0].userid, {
                      httpOnly: true,
                      signed: true
                    });
                    res.cookie("access_token", access_token, {
                      httpOnly: true,
                      signed: true
                    });
                    res.json({
                      code: 200,
                      data: {
                        userid: result[0].userid,
                        name: result[0].name,
                        first_name: result[0].first_name,
                        last_name: result[0].last_name,
                        permission: result[0].permission
                      }
                    });
                  }
                }
              );
            } else {
              res.json({
                code: 200,
                error: "password"
              });
            }
          });
        } else {
          res.json({
            code: 204,
            msg: "error"
          });
        }
      } else {
        res.json({
          code: 204,
          msg: "error"
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return router;
};
