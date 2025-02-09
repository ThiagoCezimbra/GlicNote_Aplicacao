import express from 'express';
import cadastroController from '../controllers/cadastroController.js';



const router = express.Router();

// Rota para cadastrar o usuário
router.post('/cadastro', cadastroController.registrarUsuario);

// Rota para a página de boas-vindas (recebe o ID do usuário)
router.get('/inicio/:id', (req, res) => {
    const usuarioId = req.params.id;
    // Renderiza a página de boas-vindas, passando o ID do usuário
    res.render('inicio', { usuarioId });
});


export default router;
