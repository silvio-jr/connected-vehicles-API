class Tables {
  init(connection) {
    this.connection = connection;
    this.createUserTable();
    this.createVehicleTable();
    this.createVehicleDataTable();
    this.createImageTable();
  }

  createUserTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER PRIMARY KEY AUTO_INCREMENT, 
        user_name VARCHAR(30) NOT NULL UNIQUE, 
        user_email VARCHAR(255) NOT NULL, 
        user_password VARCHAR(255) NOT NULL,
        user_fullName VARCHAR(40) NOT NULL, 
        user_joinDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  createVehicleTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS vehicle (
        user_name VARCHAR(30) NOT NULL,
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        model VARCHAR(30) NOT NULL, 
        totalSales INTEGER,
        connected INTEGER,
        softwareUpdates INTEGER,
        FOREIGN KEY (user_name) REFERENCES user(user_name)
      );
    `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  createVehicleDataTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS vehicleData (
        user_name VARCHAR(30) NOT NULL,
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        vin VARCHAR(30) NOT NULL, 
        odometer VARCHAR(30) DEFAULT ('') NOT NULL, 
        tirePressure VARCHAR(30) DEFAULT ('') NOT NULL,
        VehicleStatus VARCHAR(30) DEFAULT ('') NOT NULL,
        batteryStatus VARCHAR(30) DEFAULT ('') NOT NULL,
        fuelLevel VARCHAR(30) DEFAULT ('') NOT NULL,
        latitude VARCHAR(30) DEFAULT ('') NOT NULL,
        longitude VARCHAR(30) DEFAULT ('') NOT NULL,
        FOREIGN KEY (user_name) REFERENCES user(user_name)
      );
    `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  createImageTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS image (
        user_name VARCHAR(30) NOT NULL,
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        model VARCHAR(30) NOT NULL, 
        path VARCHAR(500) NOT NULL UNIQUE,
        FOREIGN KEY (user_name) REFERENCES vehicle(user_name)
      );
    `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

module.exports = new Tables();
