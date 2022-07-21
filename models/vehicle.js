const connection = require("../infraestructure/connection");


class Vehicle {
  add(carModel, res) {
    const sql1 = "SELECT * FROM vehicle WHERE model = ?";
    connection.query(sql1, [user.model], (error, results) => {
      if (error) {
        res.status(500).json({ error: error });
      }
      if (results.length > 0) {
        res.status(409).json({ message: "car model already exists" });
      } else {
        const sql2 = "INSERT INTO vehicle SET ?"; 
        connection.query(sql2, carModel, (error, results) => {
          if (error) {
            res.status(400).json(error);
          } else {
            res.status(201).json(carModel);
          }
        });
      }
    });
  }

  list(res) {
    const sql = "SELECT * FROM vehicle"; //query

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  getByID(id, res) {
    const sql = `SELECT * FROM vehicle WHERE id=${id}`; //query

    connection.query(sql, (error, results) => {
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
