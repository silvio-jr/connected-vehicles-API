const customExpress = require("./config/customExpress");
const connection = require("./infraestructure/connection");
const Tables = require("./infraestructure/tables");

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else { 
    Tables.init(connection);
    const app = customExpress();
    app.listen(3000, () => console.log("the server is listening on port 3000"));
  }
});
