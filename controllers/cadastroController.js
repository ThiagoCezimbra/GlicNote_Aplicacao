import Usuario from '../models/usuarioModel.js';

const cadastroController = {
    async registrarUsuario(req, res) {
        try {
            const { nome, sobrenome, data_nasc, tipo_diabetes, email, senha } = req.body;

            if (senha.length < 6 || senha.length > 8) {
                return res.status(400).json({ message: 'A senha deve ter entre 6 e 8 caracteres.' });
            }

            const novoUsuario = await Usuario.criarUsuario({ nome, sobrenome, data_nasc, tipo_diabetes, email, senha });


            if (!novoUsuario || !novoUsuario.insertId) {
                return res.status(500).json({ message: 'Erro ao criar o usuário no banco de dados.' });
            }

            const usuarioId = novoUsuario.insertId;

            req.session.usuarioId = usuarioId;

            return res.redirect(`/inicio/${usuarioId}`); 
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: error.message });
        }
    }
};

export default cadastroController;
