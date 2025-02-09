import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cadastroRoutes from './routes/cadastroRoutes.js';
import inicioRoutes from './routes/inicioRoutes.js';
import session from 'express-session';
import afericaoRoutes from './routes/afericaoRoutes.js';
import afericaoController from './controllers/afericaoController.js';
import perfilRoutes from './routes/perfilRoutes.js';  // Verifique se está correto

const app = express();

// Configuração para uso de __dirname em módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do session
app.use(session({
    secret: 'seuSegredoAqui',  // Alterar para um segredo real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Altere para true se usar HTTPS
}));

// Middleware para interpretar dados de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Necessário para interpretar JSON, se for o caso

// Definindo as rotas
app.use('/perfil', perfilRoutes);
app.use('/api', afericaoRoutes);

// DELETE route para deletar a aferição
app.delete('/api/afericao/deletar/:id', afericaoController.deletarAfericao);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
    res.send('Se você está vendo isso, o Express está funcionando corretamente.');
});


// Rotas para arquivos HTML
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));  // Serve o arquivo HTML de cadastro
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));  // Serve o arquivo HTML de login
});

// Rotas adicionais
app.use('/cadastro', cadastroRoutes);  // Rotas de cadastro
app.use(inicioRoutes);  // Rota inicial

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
