import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, password, confirm } = req.body;
  if (!email || !password || password.length < 6 || password !== confirm) {
    return res.status(400).json({ message: 'Invalid data' });
  }
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT id FROM users WHERE email=$1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User exists' });
    }
    const hash = await bcrypt.hash(password, 10);
    await client.query('INSERT INTO users (email, password, created_at) VALUES ($1,$2,NOW())', [email, hash]);
    return res.status(200).json({ message: 'ok' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
}
