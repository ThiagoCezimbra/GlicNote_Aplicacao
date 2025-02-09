import mysql from 'mysql2';

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'W9wbysm8*7922301',
    database: 'glicnote_db',
    timezone: 'America/Sao_Paulo' // Define o fuso horário para São Paulo (GMT-3)
});

// Conectando ao banco
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados.');
    }
});

export default connection;
