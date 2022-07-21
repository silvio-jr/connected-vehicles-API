const Vehicle = require("../models/vehicle");
const authToken = require("../infraestructure/auth");

module.exports = (app) => {
  app.get("/vehicle", authToken.optional, (req, res) => {
    Vehicle.list(res);
  });

  app.get("/vehicle/:id", authToken.optional, (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.getByID(id, res);
  });

  app.post("/vehicle", authToken.mandatory, (req, res) => {
    const carModel = req.body;
    Vehicle.add(carModel, res);
  });

  app.patch("/vehicle/:id", authToken.mandatory, (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Vehicle.update(id, values, res);
  });

  app.delete("/vehicle/:id", authToken.mandatory, (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.deleteByID(id, res);
  });
};
