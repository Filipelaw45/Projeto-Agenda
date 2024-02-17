import express from 'express';
import usersController from './controllers/usersController.js';
import authController from './controllers/authController.js';
import usersMiddleware from './middlewares/usersMiddleware.js';

const router = express.Router();

router.get('/user', usersMiddleware.test, usersController.getUsers);
router.post('/user', usersMiddleware.test, usersController.createUser);
router.delete('/user/:id', usersMiddleware.test, usersController.deleteUser);
router.put('/user/:id', usersMiddleware.test, usersController.updateUser);

router.post('/login', usersMiddleware.test, authController.login);

export default router;
