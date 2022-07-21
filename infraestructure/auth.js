const jwt = require("jsonwebtoken");

exports.mandatory = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret");
    req.user = decode;
    console.log("token sent by the application")
    next();
  } catch (error) {
    res.status(401).json({
      message: "authentication failed",
    });
  }
};

exports.optional = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    const decode = jwt.verify(token, "secret");
    req.user = decode;
    console.log("token sent by the application")
    next();
  } catch (error) {
    console.log("no token sent by the application")
    next();
  }
};
