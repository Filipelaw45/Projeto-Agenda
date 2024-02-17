import express from 'express';
import usersController from './controllers/usersController.js';
import authController from './controllers/authController.js';
import contactsController from './controllers/contactsController.js';
import test from './middlewares/usersMiddleware.js';
import authMiddleware from './middlewares/authMiddleware.js';
import loginMiddleware from './middlewares/loginMiddleware.js';

const router = express.Router();

router.get('/user', test, usersController.getUsers);
router.post('/user', test, usersController.createUser);
router.delete('/user/:id', test, usersController.deleteUser);
router.put('/user/:id', test, usersController.updateUser);

router.post('/login', loginMiddleware.login, authController.login);

router.get('/contact', authMiddleware.authUser, contactsController.getContacts);
router.post('/contact', authMiddleware.authUser, contactsController.createContact);
router.delete('/contact/:id', authMiddleware.authUser, contactsController.deleteContact);
router.put('/contact/:id', authMiddleware.authUser, contactsController.updateContact);

export default router;
