import pool from '../database/database.connection.js';

export const up = async () => {
  try {
    await pool.query(`
      CREATE TABLE rentals (
        costumer_id int4 REFERENCES costumers,
        game_id int4 REFERENCES games,
        rent_date date NOT NULL,
        days_rented int2 NOT NULL,
        return_date date,
        original_price int4 NOT NULL,
        delay_fee int4,
        PRIMARY KEY (costumer_id, game_id)
      );
    `);
  }
  catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    await pool.query('DROP TABLE rents;');
  }
  catch (error) {
    return error;
  }
};
