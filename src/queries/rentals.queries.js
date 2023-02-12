export const listQuery = ({ customerId, gameId, status, startDate, order, desc }) => (`
  SELECT
    rentals.id,
    rentals."customerId",
    rentals."gameId",
    rentals."rentDate",
    rentals."daysRented",
    rentals."returnDate",
    rentals."originalPrice",
    rentals."delayFee",
    json_build_object(
      'id', rentals."customerId",
      'name', customers.name
    ) AS customer,
    json_build_object(
      'id', rentals."gameId",
      'name', games.name
    ) AS game
  FROM rentals
  JOIN games ON rentals."gameId" = games.id
  JOIN customers ON rentals."customerId" = customers.id
  WHERE 1=1
  ${customerId ? `AND rentals."customerId"=${customerId}` : ''}
  ${gameId ? `AND rentals."gameId"=${gameId}` : ''}
  ${status ? `AND rentals."returnDate" IS ${status === 'closed' ? 'NOT' : ''} NULL` : ''}
  ${startDate ? `AND rentals."rentDate" >= TO_DATE('${startDate}', 'YYYY-MM-DD')` : ''}
  ORDER BY "${order}" ${desc === 'true' ? 'DESC' : ''}
  OFFSET $1
  LIMIT $2;
`);

export const createReadQuery = () => (`
  SELECT
    games."stockTotal" AS "totalNumOfGames",
    games."pricePerDay" AS "gamePricePerDay",
    COUNT(rentals."gameId") AS "numGamesRented"
  FROM games
  LEFT JOIN rentals ON rentals."gameId" = games.id
  WHERE games.id = $1
  GROUP BY games.id;
`);

export const createWriteQuery = () => (`
  INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES
  ($1, $2, NOW(), $3, $4);
`);

export const closeQuery = () => (`
  UPDATE rentals
  SET
    "returnDate" = NOW(),
    "delayFee" = GREATEST(0, (EXTRACT(day FROM NOW()-rentals."rentDate")::int4 - rentals."daysRented") * games."pricePerDay")
  FROM games
  WHERE rentals.id = $1
  AND games.id = rentals."gameId";
`);

export const deleteQuery = () => (`
  DELETE FROM rentals
  WHERE id = $1;
`);
