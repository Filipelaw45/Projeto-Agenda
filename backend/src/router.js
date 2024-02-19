import express from 'express';
import usersController from './controllers/usersController.js';
import authController from './controllers/authController.js';
import contactsController from './controllers/contactsController.js';
import validateUserSingUp from './middlewares/contactMiddleware.js';
import validateUserInput from './middlewares/usersMiddleware.js';
import authUser from './middlewares/authMiddleware.js';
import loginMiddleware from './middlewares/loginMiddleware.js';

const router = express.Router();

router.get('/user', usersController.getUsers);
// criar rota para pegar unico usuário logado!!!
// router.get('/user/:id', usersController.getUserById);
router.post('/user', validateUserInput, usersController.createUser);
router.delete('/user/:id', usersController.deleteUser);
router.put('/user/:id', usersController.updateUser);

router.post('/login', loginMiddleware.login, authController.login);

router.get('/contact', authUser, contactsController.getContacts);
router.post('/contact', authUser, validateUserSingUp, contactsController.createContact);
router.delete('/contact/:id', authUser, contactsController.deleteContact);
router.put('/contact/:id', authUser, contactsController.updateContact);

export default router;
