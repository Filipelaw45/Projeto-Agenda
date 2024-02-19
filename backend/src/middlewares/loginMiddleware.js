// eslint-disable-next-line consistent-return
const login = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    next();
  } catch {
    return res.status(500).send({ message: 'Internal server erro' });
  }
};

export default {
  login,
};
