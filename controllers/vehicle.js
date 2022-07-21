const Vehicle = require("../models/vehicle");

module.exports = (app) => {
  app.get("/vehicle", (req, res) => {
    Vehicle.list(res);
  });

  app.get("/vehicle/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.getByID(id, res);
  });

  app.post("/vehicle", (req, res) => {
    const carModel = req.body;
    Vehicle.add(carModel, res);
  });

  app.patch("/vehicle/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Vehicle.update(id, values, res);
  });

  app.delete("/vehicle/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Vehicle.deleteByID(id, res);
  });
};
