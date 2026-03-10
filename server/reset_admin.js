import 'dotenv/config';
import { pool } from './src/store.js';
import { hashPassword } from './src/auth.js';

async function resetAdmin() {
  try {
    const rawPass = "133223@SnippO";
    const hashed = await hashPassword(rawPass);
    
    await pool.query("DELETE FROM users WHERE email = 'admin@snippo.com'");
    
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, role, status, phone) 
       VALUES ('adm', 'Admin', 'admin@snippo.com', $1, 'admin', 'active', '')`,
      [hashed]
    );
    
    console.log("Admin recreated. Hash starting with:", hashed.substring(0, 15));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
resetAdmin();
