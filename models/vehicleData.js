const connection = require("../infraestructure/connection");

class VehicleData {
  add(req, res) {
    const sql1 =`
      SELECT * FROM vehicleData WHERE vin = (?) AND user_name = (?)
    `;
    connection.query(
      sql1,
      [req.body.vin, req.user.username],
      (error, results) => {
        if (error) {
          res.status(500).json({ error: error });
        }
        if (results.length > 0) {
          res
            .status(409)
            .json({ message: "vehicle have been already registered" });
        } else {
          const sql2 = `
            INSERT INTO vehicleData (user_name, vin, odometer, tirePressure, 
            VehicleStatus, batteryStatus, fuelLevel, latitude, longitude)
            VALUES (?,?,?,?,?,?,?,?,?);
            `;
          connection.query(
            sql2,
            [
              req.user.username, 
              req.body.vin,
              req.body.odometer,
              req.body.tirePressure,
              req.body.vehicleStatus,
              req.body.batteryStatus,
              req.body.fuelLevel,
              req.body.latitude,
              req.body.longitude
            ],
            (error, results) => {
              if (error) {
                res.status(400).json(error);
              } else {
                res.status(201).json([req.body, results]);
              }
            }
          );
        }
      }
    );
  }

  list(req, res) {
    const sql = `
      SELECT * FROM vehicleData WHERE user_name = ?;
    `;

    connection.query(sql, req.user.username, (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  }

  getByID(req, res) {
    const id = parseInt(req.params.id);
    const sql = `
      SELECT * FROM vehicleData WHERE user_name = ? AND id = ${id};
    `;

    connection.query(sql, req.user.username, (error, results) => {
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
    const sql = `
      UPDATE vehicleData SET odometer=(?), tirePressure=(?), VehicleStatus=(?),
      batteryStatus=(?), fuelLevel=(?), latitude=(?), longitude=(?) 
      WHERE user_name=(?) AND id=(?);
      `;
    connection.query(
      sql,
      [
        values.odometer,
        values.tirePressure,
        values.vehicleStatus,
        values.batteryStatus,
        values.fuelLevel,
        values.latitude,
        values.longitude,
        req.user.username,
        id,
      ],
      (error, results) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(200).json([{ ...values, id }, results]);
        }
      }
    );
  }

  deleteByID(req, res) {
    const id = parseInt(req.params.id);
    const sql = `
      DELETE FROM vehicleData WHERE user_name=(?) AND id=(?);
    `;
    connection.query(sql, [req.user.username, id], (error, results) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json([{ id: id }, results]);
      }
    });
  }
}

module.exports = new VehicleData();
