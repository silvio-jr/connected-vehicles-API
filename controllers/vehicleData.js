const Vehicle = require("../models/vehicleData");

module.exports = (app) => {
  app.get("/vehicleData", (req, res) => {
    Vehicle.list(res);
  });

  app.get("/vehicleData/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.getByID(id, res);
  });

  app.post("/vehicleData", (req, res) => {
    const carData = req.body;
    Vehicle.add(carData, res);
  });

  app.patch("/vehicleData/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Vehicle.update(id, values, res);
  });

  app.delete("/vehicleData/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.deleteByID(id, res);
  });
};
