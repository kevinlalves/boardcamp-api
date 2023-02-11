import pool from '../database/database.connection.js';

export const up = async () => {
  try {
    await pool.query(`
      CREATE TABLE costumers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        cpf VARCHAR(11) NOT NULL UNIQUE,
        birthday DATE NOT NULL
      );
    `);

    console.log('createCostumersTable migrated!');
  }
  catch {
    console.log('error migrating createCostumersTable...');
    console.log(error);
    return true;
  }
}

export const down = async () => {
  try {
    await pool.query('DROP TABLE costumers;');

    console.log('createCostumersTable rolled back!');
  }
  catch (error) {
    console.log('error rolling back createCostumersTable...');
    console.log(error);
    return true;
  }
}
