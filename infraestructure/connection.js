const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "admin",
  database: "ford-connected-vehicles",
});

module.exports = connection;
