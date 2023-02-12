import db from '../database/database.connection.js';

export const up = async () => {
  try {
    const query = `
      CREATE OR REPLACE FUNCTION prevent_deletion_of_open_rentals()
      RETURNS TRIGGER AS $$
      BEGIN
        IF OLD.return_date IS NULL THEN
          RAISE EXCEPTION 'cannot delete open rental';
        END IF;
        RETURN OLD;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER prevent_deletion_of_open_rentals
      BEFORE DELETE ON rentals
      FOR EACH ROW
      EXECUTE FUNCTION prevent_deletion_of_open_rentals();
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
      DROP TRIGGER prevent_deletion_of_open_rentals ON rentals;
      DROP FUNCTION prevent_deletion_of_open_rentals();
    `;

    await db.query(query);
  }
  catch (error) {
    return error;
  }
};
