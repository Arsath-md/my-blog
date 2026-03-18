const mysql = require("mysql2/promise");
require("dotenv").config(); // MUST be before using process.env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// Test connection
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Database connected successfully");
    conn.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
})();

module.exports = pool;
