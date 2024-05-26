import { query, queryWithoutParams } from '../config/database.js';

export const usersRepository = {
    getAllUsers: async() => {
        const text = 'SELECT * FROM users';
        try {
            const { rows } = await queryWithoutParams(text);
            return rows;
        } catch(err: any) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            throw err;
        }
    },

    getUserById: async(id: number) => {
        const text = 'SELECT * FROM users WHERE id = $1';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err: any) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    },

    createUser: async(email: string, name: string, password: string) => {
        const text = 'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *;';
        const params = [email, name, password];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err: any) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }
    },

    updateUser: async(id: number, email: string, name: string, password: string) => {
        const text = 'UPDATE users SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING *';
        const params = [email, name, password, id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err: any) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteUser: async(id: number) => {
        const text = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const params = [id];

        try {
            const { rows } = await query(text, params);
            return rows;
        } catch(err: any) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    }
};