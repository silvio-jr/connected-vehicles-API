const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "Agente007",
  database: "ford-connected-vehicles",
});

module.exports = connection;
