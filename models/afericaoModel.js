import db from '../config/dbconfig.js';

const Afericao = {
    // Registrar uma nova aferição
    async registrarAfericao({ fk_usuario, data_hora, valor_glicemia, tipo_medicacao, notas, medicacao_insulina }) {
        try {
            const query = `
                INSERT INTO afericoes (fk_usuario, data_hora, valor_glicemia, tipo_medicacao, notas, medicacao_insulina) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const [result] = await db.execute(query, [
                fk_usuario, data_hora, valor_glicemia, tipo_medicacao, notas, medicacao_insulina
            ]);
            return result;
        } catch (err) {
            console.error('Erro ao registrar a aferição:', err);
            throw new Error('Erro ao registrar a aferição: ' + err.message);
        }
    },

    // Obter todas as aferições de um usuário
    async obterAfericoes(fk_usuario) {
        try {
            const query = `SELECT * FROM afericoes WHERE fk_usuario = ? ORDER BY data_hora DESC`;
            const [rows] = await db.execute(query, [fk_usuario]);
            return rows;
        } catch (err) {
            console.error('Erro ao obter aferições:', err);
            throw new Error('Erro ao obter aferições: ' + err.message);
        }
    },

    // Alterar uma aferição
    async alterarAfericao(id, { valor_glicemia, data_hora, tipo_medicacao, notas, medicacao_insulina }) {
        try {
            const query = `
                UPDATE afericoes 
                SET valor_glicemia = ?, data_hora = ?, tipo_medicacao = ?, notas = ?, medicacao_insulina = ? 
                WHERE id = ?
            `;
            const [result] = await db.execute(query, [valor_glicemia, data_hora, tipo_medicacao, notas, medicacao_insulina, id]);
            return result;
        } catch (err) {
            console.error('Erro ao alterar aferição:', err);
            throw new Error('Erro ao alterar aferição: ' + err.message);
        }
    },

    // Obter uma aferição por ID
    async obterAfericoesPorId(id) {
        try {
            const query = `SELECT * FROM afericoes WHERE id = ?`;
            const [rows] = await db.execute(query, [id]);
            return rows[0]; // Retorna o primeiro item (único)
        } catch (err) {
            console.error('Erro ao obter aferição por ID:', err);
            throw new Error('Erro ao obter aferição: ' + err.message);
        }
    },

    // Deletar uma aferição
    async deletarAfericao(id) {
        try {
            const query = `DELETE FROM afericoes WHERE id = ?`;
            const [result] = await db.execute(query, [id]);
            return result;
        } catch (err) {
            console.error('Erro ao deletar aferição:', err);
            throw new Error('Erro ao deletar aferição: ' + err.message);
        }
    }
};

export default Afericao;
