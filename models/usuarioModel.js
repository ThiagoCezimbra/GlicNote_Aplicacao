// models/usuarioModel.js
import db from '../config/dbconfig.js';

const Usuario = {
    async criarUsuario({ nome, sobrenome, data_nasc, tipo_diabetes, email, senha }) {
        try {
            const query = `INSERT INTO usuarios (nome, sobrenome, data_nasc, tipo_diabetes, email, senha) 
                           VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await db.execute(query, [nome, sobrenome, data_nasc, tipo_diabetes, email, senha]);
            return result;
        } catch (err) {
            throw new Error('Erro ao criar o usuário: ' + err.message);
        }
    },

    async excluirUsuario(usuarioId) {
        try {
            const query = 'DELETE FROM usuarios WHERE id = ?';
            const [result] = await db.execute(query, [usuarioId]);
            return result;
        } catch (error) {
            throw new Error('Erro ao excluir o usuário: ' + error.message);
        }
    },
    async atualizarUsuario(usuarioId, { nome, sobrenome, data_nasc, tipo_diabetes, email, senha }) {
        try {
            let query = `
                UPDATE usuarios 
                SET nome = ?, sobrenome = ?, data_nasc = ?, tipo_diabetes = ?, email = ?`;
            const params = [nome, sobrenome, data_nasc, tipo_diabetes, email];
    
            if (senha) {
                query += `, senha = ?`;
                params.push(senha);
            }
    
            query += ` WHERE id = ?`;
            params.push(usuarioId);
    
            const [result] = await db.execute(query, params);
            return result;
        } catch (err) {
            throw new Error('Erro ao atualizar o usuário: ' + err.message);
        }
    }
,    
    async obterUsuarioPorId(id) {
        try {
            const query = `SELECT * FROM usuarios WHERE id = ?`;
            const [rows] = await db.execute(query, [id]);
            return rows[0]; // Retorna o primeiro resultado
        } catch (err) {
            throw new Error('Erro ao obter o usuário: ' + err.message);
        }
    }
};

export default Usuario;
