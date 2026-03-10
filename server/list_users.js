import 'dotenv/config';
import { pool } from './src/store.js';

async function listUsers() {
  try {
    const res = await pool.query('SELECT id, name, email, role FROM users');
    console.log('USERS_LIST_START');
    console.log(JSON.stringify(res.rows, null, 2));
    console.log('USERS_LIST_END');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
listUsers();
