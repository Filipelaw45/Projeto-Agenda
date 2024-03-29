import connection from './connection.js';

const getUser = async (username) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  const [user] = await connection.execute(query, [username]);
  return user[0];
};

const getUserById = async (id) => {
  const query = 'SELECT ID_user, username FROM users WHERE ID_user = ?';
  const [user] = await connection.execute(query, [id]);
  return user[0];
};

const getUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const createUser = async (user) => {
  const { username, password } = user;

  const query = 'INSERT INTO users(username, password) VALUES (?, ?)';

  const [createdUser] = await connection.execute(query, [username, password]);

  return { insertId: createdUser.insertId };
};

const deleteUser = async (id) => {
  const [removedUser] = await connection.execute('DELETE FROM users WHERE ID_user = ?', [id]);
  return removedUser;
};

const updateUser = async (id, user) => {
  const { username, password } = user;

  const query = 'UPDATE users SET username = ?, password = ? WHERE ID_user = ?';

  const [updatedUser] = await connection.execute(query, [username, password, id]);
  return updatedUser;
};

export default {
  getUser,
  getUserById,
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
