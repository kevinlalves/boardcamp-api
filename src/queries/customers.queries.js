export const listQuery = ({ order, desc }) => (`
  SELECT * FROM customers
  WHERE cpf LIKE $1
  ORDER BY ${order} ${desc === 'true' ? 'DESC' : 'ASC'}
  OFFSET $2
  LIMIT $3;
`);

export const showQuery = () => (`
  SELECT * FROM customers
  WHERE id = $1;
`);

export const addQuery = () => (`
  INSERT INTO customers (name, phone, cpf, birthday) VALUES
  ($1, $2, $3, $4);
`);

export const updateQuery = (setClause) => (`
  UPDATE customers
  SET ${setClause}
  WHERE id=$1;
`);
