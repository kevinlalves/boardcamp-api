export const listQuery = ({ order, desc }) => (`
  SELECT *
  FROM games
  WHERE name ILIKE $1
  ORDER BY "${order}" ${desc ? 'DESC' : ''}
  OFFSET $2
  LIMIT $3;
`);

export const addQuery = () => (`
  INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES
  ($1, $2, $3, $4);
`);
