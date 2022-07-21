class Tables {
  init(connection) {
    this.connection = connection;
    this.createVehicleTable();
    this.createVehicleDataTable();
    this.createUserTable();
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
      }
    });
  }

  createVehicleDataTable() {
    const sql = `
        CREATE TABLE IF NOT EXISTS vehicleData (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            vin VARCHAR(20) NOT NULL UNIQUE, 
            odometer VARCHAR(30) DEFAULT ('') NOT NULL, 
            tirePressure VARCHAR(30) DEFAULT ('') NOT NULL,
            VehicleStatus VARCHAR(30) DEFAULT ('') NOT NULL,
            batteryStatus VARCHAR(30) DEFAULT ('') NOT NULL,
            fuelLevel VARCHAR(30) DEFAULT ('') NOT NULL,
            latitude VARCHAR(30) DEFAULT ('') NOT NULL,
            longitude VARCHAR(30) DEFAULT ('') NOT NULL
        )`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  createUserTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        user_name VARCHAR(30) NOT NULL UNIQUE, 
        user_email VARCHAR(255) NOT NULL UNIQUE, 
        user_password VARCHAR(255) NOT NULL,
        user_fullName VARCHAR(40) NOT NULL, 
        user_joinDate TIMESTAMP DEFAULT current_timestamp
      )`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

module.exports = new Tables();
