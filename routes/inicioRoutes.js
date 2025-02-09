import express from 'express';
import path from 'path';

const router = express.Router();

// Caminho base para os arquivos HTML
const viewsPath = path.join(process.cwd(), 'views');

// Rota para renderizar a tela de boas-vindas com o ID do usuário
router.get('/inicio/:id', (req, res) => { // Alteração aqui para incluir o :id na URL
    const usuarioId = req.params.id; // Pega o ID da URL

    console.log(`[ROTA /inicio] ID do usuário na sessão: ${usuarioId}`);

    // Verifica se o ID do usuário na URL corresponde ao ID armazenado na sessão
    if (req.session.usuarioId !== parseInt(usuarioId)) {
        console.log('[ERRO] Usuário não autenticado ao acessar /inicio');
        return res.status(401).send('Usuário não autenticado ou sessão expirada.');
    }

    // Renderiza a página de boas-vindas, passando o ID do usuário
    res.sendFile(path.join(viewsPath, 'inicio.html'));
});

// Endpoint para fornecer dados da sessão ao frontend
router.get('/get-session-data', (req, res) => {
    const usuarioId = req.session.usuarioId || null;

    console.log(`[ROTA /get-session-data] Dados da sessão retornados: ${usuarioId}`);
    res.json({ usuarioId });
});

// Rota para o perfil
router.get('/perfil', (req, res) => {
    const usuarioId = req.session.usuarioId;

    console.log(`[ROTA /perfil] ID do usuário na sessão: ${usuarioId}`);

    if (!usuarioId) {
        console.log('[ERRO] Usuário não autenticado ao acessar /perfil');
        return res.redirect('/login');
    }

    res.sendFile(path.join(viewsPath, 'perfil.html'));
});

// Rota para a nova medida
router.get('/registrar', (req, res) => {
    const usuarioId = req.session.usuarioId;

    console.log(`[ROTA /registrar] ID do usuário na sessão: ${usuarioId}`);

    if (!usuarioId) {
        console.log('[ERRO] Usuário não autenticado ao acessar /registrar');
        return res.redirect('/login');
    }

    res.sendFile(path.join(viewsPath, 'registrar.html'));
});

// Rota para o histórico de medidas
router.get('/historico', (req, res) => {
    const usuarioId = req.session.usuarioId;

    console.log(`[ROTA /historico] ID do usuário na sessão: ${usuarioId}`);

    if (!usuarioId) {
        console.log('[ERRO] Usuário não autenticado ao acessar /historico');
        return res.redirect('/login');
    }

    res.sendFile(path.join(viewsPath, 'historico.html'));
});

// Rota para logout
router.get('/login', (req, res) => {
    console.log('[LOGOUT] Usuário realizou logout. Sessão destruída.');
    req.session.destroy();
    res.redirect('/login');
});

export default router;
