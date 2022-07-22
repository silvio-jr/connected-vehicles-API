const express = require("express");
const consign = require("consign");

module.exports = () => {
  const app = express();
  app.use("/img", express.static("img"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Acess-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).send({});
    }
    next();
  });
  consign().include("controllers").into(app);
  return app;
};
