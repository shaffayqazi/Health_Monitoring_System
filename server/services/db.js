// services/db.js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost", // Your MySQL host
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "heath managment", // Your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function verifyConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection successful");
    connection.release(); // Don't forget to release the connection back to the pool
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

verifyConnection();

module.exports = pool;
