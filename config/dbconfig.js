// config/dbConfig.js
import mysql from 'mysql2'; // Importando o mysql2
import dotenv from 'dotenv'; // Importando o dotenv

dotenv.config(); // Carrega as variáveis do arquivo .env

// Criação do pool de conexões
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

// Teste de conexão com o banco de dados
pool.promise().query('SELECT 1')
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    });

// Exportando o pool de conexões
export default pool.promise();
