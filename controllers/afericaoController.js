import Afericao from '../models/afericaoModel.js';
import moment from 'moment-timezone';

const afericaoController = {
    async registrarAfericao(req, res) {
        try {
            const { valor_glicemia, data_hora, tipo_medicacao, notas, medicacao_insulina } = req.body;
    
            if (!valor_glicemia || !data_hora || !tipo_medicacao) {
                return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
            }
    
            // Converter e validar a data com fuso horário
            const dataHoraBrasilia = moment.tz(data_hora, 'YYYY-MM-DDTHH:mm', 'America/Sao_Paulo');
    
            if (!dataHoraBrasilia.isValid()) {
                return res.status(400).json({ message: 'Data inválida', data_hora });
            }
    
            const dataHoraBrasiliaFormatada = dataHoraBrasilia.format('YYYY-MM-DD HH:mm:ss');
    
            await Afericao.registrarAfericao({
                fk_usuario: req.session.usuarioId,
                valor_glicemia,
                data_hora: dataHoraBrasiliaFormatada,
                tipo_medicacao,
                notas,
                medicacao_insulina
            });
    
            return res.redirect(`/inicio/${req.session.usuarioId}`);
    
        } catch (error) {
            console.error('Erro ao registrar aferição:', error);
            res.status(500).json({ message: 'Erro ao registrar aferição', error: error.message });
        }
    },

    // Obter todas as aferições de um usuário
    async getAfericoes(req, res) {
        try {
            const usuarioId = req.session.usuarioId;
            const afericoes = await Afericao.obterAfericoes(usuarioId);
    
            const afericoesFormatadas = afericoes.map(afericao => {
                const dataHora = moment(afericao.data_hora);
    
                if (dataHora.isValid()) {
                    afericao.data_hora = dataHora.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm');
                } else {
                    afericao.data_hora = 'Data inválida';
                }
                return afericao;
            });
    
            res.status(200).json(afericoesFormatadas);
        } catch (error) {
            console.error('Erro ao obter aferições:', error);
            res.status(500).json({ message: 'Erro ao obter aferições', error: error.message });
        }
    }
    ,

    // Alterar uma aferição específica
    async alterarAfericao(req, res) {
        try {
            const { id } = req.params;
            const afericao = await Afericao.obterAfericoesPorId(id);

            if (!afericao) {
                return res.status(404).json({ message: 'Aferição não encontrada' });
            }

            res.status(200).json(afericao); // Retorna os dados para preencher o formulário
        } catch (error) {
            console.error('Erro ao alterar aferição:', error);
            res.status(500).json({ message: 'Erro ao alterar aferição', error: error.message });
        }
    },

    // Atualizar uma aferição
    async atualizarAfericao(req, res) {
        try {
            const { id } = req.params;
            const { valor_glicemia, data_hora, tipo_medicacao, notas, medicacao_insulina } = req.body;

            // Verificar se a data é válida antes de tentar convertê-la
            const dataHoraBrasilia = moment(data_hora, 'YYYY-MM-DDTHH:mm', true);

            if (!dataHoraBrasilia.isValid()) {
                return res.status(400).json({ message: 'Data inválida', data_hora });
            }

            // Converter a data_hora para o horário correto antes de atualizar
            const dataHoraBrasiliaFormatada = dataHoraBrasilia.tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

            const resultado = await Afericao.alterarAfericao(id, { valor_glicemia, data_hora: dataHoraBrasiliaFormatada, tipo_medicacao, notas, medicacao_insulina });

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: 'Aferição não encontrada' });
            }

            return res.redirect(`/inicio/${req.session.usuarioId}`);
        } catch (error) {
            console.error('Erro ao atualizar aferição:', error);
            res.status(500).json({ message: 'Erro ao atualizar aferição', error: error.message });
        }
    },

    async deletarAfericao(req, res) {
        try {
            const { id } = req.params;
    
            const result = await Afericao.deletarAfericao(id);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Aferição não encontrada' });
            }
    
            res.status(200).json({ message: 'Aferição deletada com sucesso' });
        } catch (error) {
            console.error('Erro ao deletar aferição:', error);
            res.status(500).json({ message: 'Erro ao deletar aferição', error: error.message });
        }
    }
};

export default afericaoController;
