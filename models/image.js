const connection = require("../infraestructure/connection");
const fs = require("fs");

class Image {
  add(req, res) {
    const sql1 = "SELECT * FROM image WHERE model = (?) AND user_name = (?)";
    connection.query(
      sql1,
      [req.body.model, req.user.username],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error });
        }
        if (results.length > 0) {
          this.checkImgFolder();
          res.status(409).json({ message: "car model already exists" });
        } else {
          const sql2 =
            "INSERT INTO image (user_name, model, path) VALUES (?,?,?);";
          const arr = [req.user.username, req.body.model, req.file.path];
          connection.query(sql2, arr, (error, results) => {
            if (error) {
              res.status(500).json(error);
            } else {
              res.status(201).json(arr);
            }
          });
        }
      }
    );
  }

  checkImgFolder() {
    const sql = "SELECT * FROM image";
    const imgPaths = [];
    connection.query(sql, (error, results) => {
      if (error) res.status(500).json(error);
      else {
        results.forEach((result) => {
          imgPaths.push(result.path);
        });
        fs.readdir("./img", (err, files) => {
          files.forEach((file) => {
            if (!(imgPaths.indexOf("img\\" + file) + 1)) {
              fs.unlink("img\\" + file, (err) => {});
            }
          });
        });
      }
    });
  }
}


module.exports = new Image();
