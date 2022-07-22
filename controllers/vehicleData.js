const VehicleData = require("../models/vehicleData");
const authToken = require("../infraestructure/auth");

module.exports = (app) => {
  app.get("/vehicleData", authToken.optional, (req, res) => {
    VehicleData.list(req, res);
  });

  app.get("/vehicleData/:id", authToken.optional, (req, res) => {
    VehicleData.getByID(req, res);
  });

  app.post("/vehicleData", authToken.mandatory, (req, res) => {
    VehicleData.add(req, res);
  });

  app.patch("/vehicleData/:id", authToken.mandatory, (req, res) => {
    VehicleData.update(req, res);
  });

  app.delete("/vehicleData/:id", authToken.mandatory, (req, res) => {
    VehicleData.deleteByID(req, res);
  });
};
