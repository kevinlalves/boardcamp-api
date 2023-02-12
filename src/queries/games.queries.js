import camelToSnakeCase from '../utils/functions/camelToSnakeCase.js';

export const listQuery = ({ order, desc }) => (`
  SELECT
    id,
    name,
    image,
    stock_total AS "stockTotal",
    price_per_day AS "pricePerDay"
  FROM games
  WHERE name ILIKE $1
  ORDER BY ${camelToSnakeCase(order)} ${desc ? 'DESC' : 'ASC'}
  OFFSET $2
  LIMIT $3;
`);

export const addQuery = () => (`
  INSERT INTO games (name, image, stock_total, price_per_day) VALUES
  ($1, $2, $3, $4);
`);
