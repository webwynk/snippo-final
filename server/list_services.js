import 'dotenv/config';
import { pool } from './src/store.js';

async function list() {
  try {
    const res = await pool.query('SELECT * FROM services ORDER BY id');
    console.log('COUNT:', res.rows.length);
    console.log('SERVICES:', JSON.stringify(res.rows, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
list();
