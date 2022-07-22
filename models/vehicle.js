const connection = require("../infraestructure/connection");

class Vehicle {
  add(req, res) {
    const sql1 = "SELECT * FROM vehicle WHERE model = (?) AND user_name = (?)";
    connection.query(sql1, [req.body.model, req.user.username], (error, results) => {
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
    });
  }

  list(req,res) {
    const sql = "SELECT * FROM vehicle WHERE user_name = (?)"; 

    connection.query(sql, [req.user.username] ,(error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  getByID(req, res) {
    const id = parseInt(req.params.id);
    const sql = `SELECT * FROM vehicle WHERE id=${id} WHERE user_name = (?)`; 

    connection.query(sql, [req.user.username], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results[0]);
      }
    });
  }

  update(id, values, res) {
    const sql = "UPDATE vehicle SET ? WHERE id=?";
    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...values, id });
      }
    });
  }

  deleteByID(id, res) {
    const sql = "DELETE FROM vehicle WHERE id=?"; //query
    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Vehicle();
