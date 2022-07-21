const Vehicle = require("../models/vehicleData");
const authToken = require("../infraestructure/auth");

module.exports = (app) => {
  app.get("/vehicleData", authToken.optional, (req, res) => {
    Vehicle.list(res);
  });

  app.get("/vehicleData/:id", authToken.optional, (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.getByID(id, res);
  });

  app.post("/vehicleData", authToken.mandatory, (req, res) => {
    const carData = req.body;
    Vehicle.add(carData, res);
  });

  app.patch("/vehicleData/:id", authToken.mandatory, (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Vehicle.update(id, values, res);
  });

  app.delete("/vehicleData/:id", authToken.mandatory, (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.deleteByID(id, res);
  });
};
