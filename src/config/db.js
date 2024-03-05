const mysql = require("mysql2/promise");

async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'prestamos',
  });

  return connection;
}

module.exports = createConnection;
