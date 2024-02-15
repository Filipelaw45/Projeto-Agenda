import express from 'express';
import users from './controllers/usersController.js';
import usersMiddleware from './middlewares/usersMiddleware.js';

const router = express.Router();

router.get('/', usersMiddleware.test, users.getAll);
router.post('/user', usersMiddleware.test, users.createUser);
router.delete('/user/:id', usersMiddleware.test, users.deleteUser);

export default router;
