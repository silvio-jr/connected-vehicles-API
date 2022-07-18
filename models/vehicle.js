const connection = require("../infraestructure/connection");

class Vehicle {
  add(carModel, res) {
    const sql = "INSERT INTO vehicle SET ?"; //query
    connection.query(sql, carModel, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(201).json(carModel);
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

  searchByID(id, res) {
    const sql = `SELECT * FROM vehicle WHERE id=${id}`; //query

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results[0]);
      }
    });
  }

  update(id, value, res) {
    const sql = "UPDATE vehicle SET ? WHERE id=?";
    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({...values, id});
      }
    });
  }

  deleteByID(id, res) {
    const sql = "DELETE FROM vehicle WHERE id=?" //query
    connection.query(sql, id, (error, results) => {
        if (error) {
            res.status(400).json(error)
        } else {
            res.status(200).json({id})
        }
    })
  }
}

module.exports = new Vehicle();
