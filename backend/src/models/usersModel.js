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

const updateUser = async (id, user) => {
  const { name, email } = user;

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

  const [updatedUser] = await connection.execute(query, [name, email, id]);
  return updatedUser;
};

export default {
  getAll,
  createUser,
  deleteUser,
  updateUser,
};
