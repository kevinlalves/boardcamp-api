import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      CREATE OR REPLACE FUNCTION prevent_multiple_return_date_update()
      RETURNS TRIGGER AS $$
      BEGIN
        IF OLD.return_date IS NOT NULL THEN
          RAISE EXCEPTION 'return_date cannot be set multiple times';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER prevent_multiple_return_date
      BEFORE UPDATE ON rentals
      FOR EACH ROW
      EXECUTE FUNCTION prevent_multiple_return_date_update();
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};

export const down = async () => {
  try {
    const query = `
      DROP TRIGGER prevent_multiple_return_date ON rentals;
      DROP FUNCTION prevent_multiple_return_date_update();
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
