import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({
  path: `envs/${process.env.NODE_ENV}.env`
});

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URI,
  ssl: process.env.NODE_ENV === 'production'
});

export default db;
