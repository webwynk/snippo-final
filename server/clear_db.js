import 'dotenv/config';
import { pool } from './src/store.js';

async function clearDB() {
  try {
    console.log("Emptying database tables...");
    // Clear all tables except services (which we already cleaned up)
    await pool.query(`DELETE FROM users`);
    await pool.query(`DELETE FROM staff`);
    await pool.query(`DELETE FROM bookings`);
    await pool.query(`DELETE FROM pending_staff`);
    // Optional: Reset counters so new bookings start fresh
    await pool.query(`DELETE FROM counters`);
    console.log("Database cleared successfully.");
    process.exit(0);
  } catch (e) {
    console.error("Error clearing DB:", e);
    process.exit(1);
  }
}

clearDB();
