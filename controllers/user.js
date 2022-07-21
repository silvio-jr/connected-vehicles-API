const User = require("../models/user");

module.exports = (app) => {
  app.post("/signup", (req, res) => {
    const user = req.body;
    User.register(user, res);
  });
};
