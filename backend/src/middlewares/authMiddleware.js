import jwt from 'jsonwebtoken';
import usersController from '../controllers/usersController.js';
// eslint-disable-next-line consistent-return
const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ message: 'Token não informado!' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).send({ message: 'Token invalido!' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ message: 'Token mal formatado!' });

    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) return res.status(401).send({ message: 'Invalid token!' });
      const user = await usersController.getUserById(decoded.id);
      if (!user || !user.ID_user) return res.status(401).send({ message: 'Token invalido!' });

      req.userId = user.ID_user;
      next();
    });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server erro' });
  }
};

export default authUser;
