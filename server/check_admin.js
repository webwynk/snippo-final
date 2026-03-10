import 'dotenv/config';
import { pool } from './src/store.js';

async function checkAdmin() {
  try {
    const res = await pool.query("SELECT id, name, email, role, password_hash FROM users WHERE email = 'admin@snippo.com' OR role = 'admin'");
    console.log("Found admins:", res.rows);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
checkAdmin();
