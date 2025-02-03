const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: 'nodeuser',
  password:'admin@098',
  server: "DESKTOP-UPKIDK7\\SQLEXPRESS",
  database: "NodeDB",
  port: 1433,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: false, 
    trustServerCertificate: true, 
  },
};

async function connectToDB() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("✅ Connected to SQL Server");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    throw err;
  }
}

module.exports = { sql, connectToDB };
