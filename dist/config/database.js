import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';
const poolConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432
};
const pool = new Pool(poolConfig);
pool.on('error', (err) => {
    console.error(`Erro inesperado no cliente da pool: ${err}`);
    process.exit(-1);
});
export const query = (text, params) => pool.query(text, params);
export const queryWithoutParams = (text) => pool.query(text);
