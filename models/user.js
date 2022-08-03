const connection = require("../infraestructure/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  register(user, res) {
    const sql1 = "SELECT * FROM user WHERE user_name = ?";
    connection.query(sql1, [user.name], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      if (results.length > 0) {
        return res.status(409).json({ message: "user already exists" });
      } else {
        bcrypt.hash(user.password, 10, (errorBcrypt, hash) => {
          if (errorBcrypt) {
            return res.status(500).json({ error: errorBcrypt });
          } else {
            const sql2 = `
            INSERT INTO user (user_name, user_email, user_password, user_fullName) 
            VALUES (?,?,?,?)
            `;
            connection.query(
              sql2,
              [user.name, user.email, hash, user.fullName],
              (error, results) => {
                if (error) {
                  return res.status(400).json(error);
                } else {
                  return res.status(201).json({
                    message: "user registered",
                    user: user.name,
                    email: user.email,
                  });
                }
              }
            );
          }
        });
      }
    });
  }

  login(user, res) {
    const sql = "SELECT * FROM user WHERE user_name = ?";
    // console.log(user) 
    connection.query(sql, [user.username], (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error: error });
        
      } else if (results.length < 1) {
        return res.status(401).json({ message: "authentication failed" });
      }

      bcrypt.compare(
        user.password,
        results[0].user_password,
        (error, result) => {
          if (error) {
            return res.status(401).json({ message: "authentication failed" });
          } else if (result) {
            let token = jwt.sign(
              {
                userid: results[0].user_id,
                username: results[0].user_name,
                email: results[0].user_email,
              },
              "secret",
              {
                expiresIn: "24h",
              }
            );
            res.status(200).json({
              message: "Authenticated",
              userid: results[0].user_id,
              username: results[0].user_name,
              email: results[0].user_email,
              token: token,
            });
          } else {
            return res.status(401).json({ message: "authentication failed" });
          }
        }
      );
    });
  }
}

module.exports = new User();
