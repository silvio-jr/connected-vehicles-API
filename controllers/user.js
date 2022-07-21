const User = require("../models/user");

module.exports = (app) => {
  app.post("/signup", (req, res) => {
    const user = req.body;
    User.register(user, res);
  });

  app.post("/login", (req, res, next) => {
    const user = req.body;
    User.login(user, res);
  })
};
