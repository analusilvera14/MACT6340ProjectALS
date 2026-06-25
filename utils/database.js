import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const cstring = process.env.MYSQL_CSTRING;

// Pool is created once when this module loads.
// SSL is forced on because DigitalOcean managed MySQL requires it.
const pool = mysql.createPool({
  uri: cstring,
  ssl: { rejectUnauthorized: false }
}).promise();

// Kept as a no-op so existing `await db.connect()` calls in app.js still work.
export async function connect() {
  return pool;
}

export async function getAllProjects() {
  const [rows] = await pool.query(`SELECT * FROM projects;`);
  return rows;
}
