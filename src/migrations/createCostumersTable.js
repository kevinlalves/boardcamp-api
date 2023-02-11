import pool from '../database/database.connection.js';

export const up = async () => {
  try {
    await pool.query(`
      CREATE TABLE costumers (
        id serial PRIMARY KEY,
        name text NOT NULL,
        phone text NOT NULL,
        cpf varchar(11) NOT NULL UNIQUE,
        birthday date NOT NULL
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
