// Importando o Router do Express
import express from 'express';

// Criando o router
const router = express.Router();

// Importando o controller do usuário
import * as userController from '../controllers/userController.js';

// Rota para cadastro de usuário
router.post('/register', userController.registerUser);

// Rota para login de usuário
router.post('/login', userController.loginUser);

// Rota para visualizar o perfil do usuário
router.get('/profile', userController.getUserProfile);

export default router;
