import connection from './connection.js';

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const createUser = async (user) => {
  const { name, email } = user;

  const query = 'INSERT INTO users(name, email) VALUES (?, ?)';

  const [createdUser] = await connection.execute(query, [name, email]);

  return { insertId: createdUser.insertId };
};

const deleteUser = async (id) => {
  const [removedUser] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
  return removedUser;
};

export default {
  getAll,
  createUser,
  deleteUser,
};
