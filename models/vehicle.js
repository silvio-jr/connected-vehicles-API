const connection = require("../infraestructure/connection");
const Image = require("../models/image");

class Vehicle {
  add(req, res) {
    const sql1 = `
    SELECT * FROM vehicle WHERE model = (?) AND user_name = (?)
    `;
    connection.query(
      sql1,
      [req.body.model, req.user.username],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error });
        }
        if (results.length > 0) {
          return res.status(409).json({ message: "car model already exists" });
        } else {
          const arr = [
            req.user.username,
            req.body.model,
            req.body.totalSales,
            req.body.connected,
            req.body.softwareUpdates,
          ];
          const sql2 = `
            INSERT INTO vehicle (user_name, model, totalSales, 
            connected, softwareUpdates) VALUES (?,?,?,?,?);
            `;
          connection.query(sql2, arr, (error, results) => {
            if (error) {
              return res.status(400).json(error);
            } else {
              return res.status(201).json([arr, results]);
            }
          });
        }
      }
    );
  }

  list(req, res) {
    const sql = `
      SELECT A.user_name, A.id, A.model, A.totalSales, 
      A.connected, A.softwareUpdates, B.path
      FROM vehicle A INNER JOIN image B
      ON A.model = B.model
      WHERE A.user_name = (?)
      GROUP BY A.model;
    `;
    connection.query(sql, [req.user.username], (error, results) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(results);
      }
    });
  }

  getByID(req, res) {
    const id = parseInt(req.params.id);
    const sql = `
      SELECT A.user_name, A.id, A.model, A.totalSales, 
      A.connected, A.softwareUpdates, B.path
      FROM vehicle A INNER JOIN image B
      ON A.model = B.model
      WHERE A.user_name = (?) AND A.id=${id}
      GROUP BY A.model;
    `;
    connection.query(sql, [req.user.username], (error, results) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json(results[0]);
      }
    });
  }

  update(req, res) {
    const id = parseInt(req.params.id);
    const values = req.body;
    const sql = `
      UPDATE vehicle SET totalSales = (?), connected = (?), softwareUpdates = (?) 
      WHERE user_name = (?) AND id = (?);
    `;
    connection.query(
      sql,
      [
        values.connected,
        values.totalSales,
        values.softwareUpdates,
        req.user.username,
        id,
      ],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        } else {
          return res.status(200).json([{ ...values, id }, results]);
        }
      }
    );
  }

  deleteById(req, res) {
    const id = parseInt(req.params.id);

    const sql = `
      DELETE vehicle, image
      FROM vehicle INNER JOIN image
      ON vehicle.model = image.model
      WHERE vehicle.user_name = (?) AND vehicle.id = (?);
      `;
    connection.query(sql, [req.user.username, id], (error, results) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        Image.checkImgFolder();
        return res.status(200).json([{ id: id }, results]);
        
      }
    });
  }
}

module.exports = new Vehicle();
