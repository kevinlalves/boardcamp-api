import camelToSnakeCase from '../utils/functions/camelToSnakeCase.js';

export const listQuery = ({ customerId, gameId, status, startDate, order, desc }) => (`
  SELECT
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
  ${startDate ? `AND rentals.rent_date >= ${startDate}::date` : ''}
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
