const connection = require("../infraestructure/connection");
const Image = require("../models/image");

class Vehicle {
  add(req, res) {
    const sql1 = "SELECT * FROM vehicle WHERE model = (?) AND user_name = (?)";
    connection.query(
      sql1,
      [req.body.model, req.user.username],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error });
        }
        if (results.length > 0) {
          res.status(409).json({ message: "car model already exists" });
        } else {
          const arr = [
            req.user.username,
            req.body.model,
            req.body.totalSales,
            req.body.connected,
            req.body.softwareUpdates,
          ];
          const sql2 =
            "INSERT INTO vehicle (user_name, model, totalSales, connected, softwareUpdates) VALUES (?,?,?,?,?)";
          connection.query(sql2, arr, (error, results) => {
            if (error) {
              res.status(400).json(error);
            } else {
              res.status(201).json(arr);
            }
          });
        }
      }
    );
  }

  list(req, res) {
    const sql = `SELECT A.user_name, A.id, A.model, A.totalSales, 
      A.connected, A.softwareUpdates, B.path
      FROM vehicle A INNER JOIN image B
      ON A.user_name = B.user_name
      WHERE A.user_name = (?)
      GROUP BY A.model;
    `;
    connection.query(sql, [req.user.username], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  getByID(req, res) {
    const id = parseInt(req.params.id);
    const sql = `SELECT A.user_name, A.id, A.model, A.totalSales, 
      A.connected, A.softwareUpdates, B.path
      FROM vehicle A INNER JOIN image B
      ON A.user_name = B.user_name
      WHERE A.user_name = (?) AND A.id=${id}
      GROUP BY A.model;
    `;
    connection.query(sql, [req.user.username], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results[0]);
      }
    });
  }

  update(req, res) {
    const id = parseInt(req.params.id);
    const values = req.body;
    const sql = `UPDATE vehicle SET totalSales = (?), 
      connected = (?), softwareUpdates = (?) WHERE id=?`;
    connection.query(
      sql,
      [values.connected, values.totalSales, values.softwareUpdates, id],
      (error, results) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json({ ...values, id });
        }
      }
    );
  }

  deleteById(req, res) {
    const id = parseInt(req.params.id);

    const sql = `DELETE vehicle, image
      FROM vehicle INNER JOIN image
      ON vehicle.user_name = image.user_name
      WHERE vehicle.id = ?;
      `;
    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ deleted: id });
        Image.checkImgFolder();
      }
    });
  }
}

module.exports = new Vehicle();
