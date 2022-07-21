const connection = require("../infraestructure/connection");
const bcrypt = require("bcrypt");

class User {
  register(user, res) {
    connection.query(
      "SELECT * FROM user WHERE user_email = ?", //check if email already exists
      [user.user_email],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error });
        }
        if (results.length > 0) {
          res.status(409).json({ message: "user already exists" });
        } else {
          bcrypt.hash(user.user_password, 10, (errorBcrypt, hash) => {
            if (errorBcrypt) {
              res.status(500).json({ error: errorBcrypt });
            } else {
              const sql = `INSERT INTO user (user_name, user_email, user_password, user_fullName) 
                            VALUES (?,?,?,?)`; //query
              connection.query(
                sql,
                [user.user_name, user.user_email, hash, user.user_fullName],
                (error, results) => {
                  if (error) {
                    res.status(400).json(error);
                  } else {
                    res.status(201).json({
                      message: "user registered",
                      user: user.user_name,
                      email: user.user_email,
                    });
                  }
                }
              );
            }
          });
        }
      }
    );
  }
}

module.exports = new User();
