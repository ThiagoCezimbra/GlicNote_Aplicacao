import express from 'express';
import afericaoController from '../controllers/afericaoController.js';

const router = express.Router();

// Rota para editar uma aferição específica (corrigido para alterarAfericao)
router.get('/afericao/alterar/:id', afericaoController.alterarAfericao); // Método de edição

// Rota para registrar uma nova aferição ou alterar uma existente
router.post('/registrar/nova-medida', afericaoController.registrarAfericao); // Método de registro e alteração

// Rota para obter o histórico de aferições
router.get('/historico', afericaoController.getAfericoes);

// Rota para alterar uma aferição específica
// No afericaoRoutes.js
router.post('/afericao/alterar/:id', afericaoController.atualizarAfericao);


router.delete('/afericao/deletar/:id', afericaoController.deletarAfericao);


export default router;
