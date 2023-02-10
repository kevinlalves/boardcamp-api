import pool from '../database/database.connection.js';

try {
  pool.query(`
  CREATE TABLE costumers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    birthday DATE NOT NULL
  );
`);
} catch {
  console.log('createCostumersTable migrated...');
}
