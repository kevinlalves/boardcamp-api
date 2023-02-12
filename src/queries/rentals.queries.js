import camelToSnakeCase from '../utils/functions/camelToSnakeCase.js';

export const listQuery = ({ customerId, gameId, status, startDate, order, desc }) => (`
  SELECT
    rentals.id,
    rentals.customer_id AS "customerId",
    rentals.game_id AS "gameId",
    rentals.rent_date AS "rentDate",
    rentals.days_rented AS "daysRented",
    rentals.return_date AS "returnDate",
    rentals.original_price AS "originalPrice",
    rentals.delay_fee AS "delayFee",
    json_build_object(
      'id', rentals.customer_id,
      'name', customers.name
    ) AS customer,
    json_build_object(
      'id', rentals.game_id,
      'name', games.name
    ) AS game
  FROM rentals
  JOIN games ON rentals.game_id=games.id
  JOIN customers ON rentals.customer_id=customers.id
  WHERE 1=1
  ${customerId ? `AND rentals.customer_id=${customerId}` : ''}
  ${gameId ? `AND rentals.game_id=${gameId}` : ''}
  ${status ? `AND rentals.return_date IS ${status === 'closed' ? 'NOT' : ''} NULL` : ''}
  ${startDate ? `AND rentals.rent_date >= TO_DATE('${startDate}', 'YYYY-MM-DD')` : ''}
  ORDER BY ${camelToSnakeCase(order)} ${desc === 'true' ? 'DESC' : ''}
  OFFSET $1
  LIMIT $2;
`);

export const createReadQuery = () => (`
  SELECT
    games.stock_total AS "totalNumOfGames",
    games.price_per_day AS "gamePricePerDay",
    COUNT(rentals.game_id) AS "numGamesRented"
  FROM games
  LEFT JOIN rentals ON rentals.game_id = games.id
  WHERE games.id = $1
  GROUP BY games.id;
`);

export const createWriteQuery = () => (`
  INSERT INTO rentals (customer_id, game_id, days_rented, original_price) VALUES
  ($1, $2, $3, $4);
`);

export const closeQuery = () => (`
  UPDATE rentals
  SET
    return_date = NOW(),
    delay_fee = GREATEST(0, (EXTRACT(day FROM NOW()-rentals.rent_date)::int2 - rentals.days_rented) * games.price_per_day)
  FROM games
  WHERE rentals.id = $1
  AND games.id = rentals.game_id;
`);

export const deleteQuery = () => (`
  DELETE FROM rentals
  WHERE id = $1;
`);
