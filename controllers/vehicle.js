const Vehicle = require("../models/vehicle");
const authToken = require("../infraestructure/auth");
const upload = require("../models/upload");
const Image = require("../models/image");

module.exports = (app) => {

  app.get("/vehicle", authToken.optional, (req, res) => {
    Vehicle.list(req, res);
  });

  app.get("/vehicle/:id", authToken.optional, (req, res) => {
    Vehicle.getByID(req, res);
  });

  app.post("/vehicle", authToken.mandatory, (req, res) => {
    Vehicle.add(req, res);
  });

  app.post( "/vehicle/upload",
    upload.single("vehicle_image"),
    authToken.mandatory,
    (req, res) => {
      Image.add(req, res);
    }
  );

  app.patch("/vehicle/:id", authToken.mandatory, (req, res) => {
    Vehicle.update(req, res);
  });

  app.delete("/vehicle/:id", authToken.mandatory, (req, res) => {
    Vehicle.deleteById(req, res);
  });
};
