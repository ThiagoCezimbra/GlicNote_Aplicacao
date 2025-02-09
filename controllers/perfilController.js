import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

const perfilController = {

    // Função para carregar os dados do perfil
    async carregarPerfil(req, res) {
        try {
            const usuarioId = req.session.usuarioId;
            console.log('ID do usuário na sessão:', usuarioId); // Log do ID da sessão

            if (!usuarioId) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            const usuario = await Usuario.obterUsuarioPorId(usuarioId);
            console.log('Dados do usuário:', usuario); // Log dos dados retornados

            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            res.status(500).json({ message: 'Erro ao carregar perfil.', error: error.message });
        }
    },

    // Função para atualizar os dados do perfil
    async atualizarPerfil(req, res) {
        try {
            const usuarioId = req.session.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            const { nome, sobrenome, data_nasc, tipo_diabetes, email, senha } = req.body;

            // Validação básica
            if (!nome || !sobrenome || !data_nasc || !tipo_diabetes || !email) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos.' });
            }

            // Atualiza os dados no banco
            const hashedSenha = senha ? await bcrypt.hash(senha, 10) : null; // Apenas hash se senha for enviada
            const resultado = await Usuario.atualizarUsuario(usuarioId, { 
                nome, sobrenome, data_nasc, tipo_diabetes, email, senha: hashedSenha 
            });

            if (resultado.affectedRows > 0) {
                res.status(200).json({ message: 'Perfil atualizado com sucesso!' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            res.status(500).json({ message: 'Erro ao atualizar perfil.', error: error.message });
        }
    },

    // Função para excluir o perfil
    async excluirPerfil(req, res) {
        try {
            // Verifica se o usuário está logado
            const usuarioId = req.session.usuarioId;
            if (!usuarioId) {
                return res.status(401).json({ message: 'Usuário não autenticado.' });
            }

            // Exclui o usuário
            const resultado = await Usuario.excluirUsuario(usuarioId);

            if (resultado.affectedRows > 0) {
                // Destroi a sessão e responde com sucesso
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Erro ao destruir sessão.' });
                    }
                    res.status(200).json({ message: 'Usuário excluído com sucesso!' });
                });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao excluir o perfil:', error);
            res.status(500).json({ message: 'Erro ao excluir o perfil.', error: error.message });
        }
    }
};

export default perfilController;
