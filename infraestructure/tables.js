class Tables {
  init(connection) {
    this.connection = connection;
    this.createVehicleTable();
  }

  createVehicleTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS vehicle (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        model VARCHAR(25) NOT NULL, 
        totalSales INTEGER,
        connected INTEGER,
        softwareUpdates INTEGER
        )`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("vehicle table successfully loaded");
      }
    });
  }
}

module.exports = new Tables();
