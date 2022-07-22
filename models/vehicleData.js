const connection = require("../infraestructure/connection");

class VehicleData {
  add(carData, res) {
    const sql = "INSERT INTO vehicleData SET ?"; 
    connection.query(sql, carData, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(201).json(carData);
      }
    });
  }

  list(res) {
    const sql = "SELECT * FROM vehicleData"; 

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  getByID(id, res) {
    const sql = `SELECT * FROM vehicleData WHERE id=${id}`; 

    connection.query(sql, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results[0]);
      }
    });
  }

  update(id, values, res) {
    const sql = "UPDATE vehicleData SET ? WHERE id=?";
    connection.query(sql, [values, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ ...values, id });
      }
    });
  }

  deleteByID(id, res) {
    const sql = "DELETE FROM vehicleData WHERE id=?"; 
    connection.query(sql, id, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new VehicleData();
