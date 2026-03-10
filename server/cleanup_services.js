import 'dotenv/config';
import { pool } from './src/store.js';

async function cleanup() {
  try {
    const res = await pool.query('DELETE FROM services WHERE id != 7');
    console.log(`Deleted ${res.rowCount} services.`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
cleanup();
