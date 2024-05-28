import { query, queryWithoutParams } from '../config/database.js';

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
};

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

    getUserByEmail: async (email: string) => {
        const text = 'SELECT * FROM users WHERE email = $1';
        const params = [email];

        try {
            const { rows } = await query(text, params);
            return rows[0];
        } catch (err: any) {
            console.error(`Erro ao recuperar usuário com email ${email}: ${err.message}`);
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

    updateUser: async(id: number, updatedFields: Partial<User>) => {
        const fields: string[] = [];
        const params: any[] = [];

        Object.keys(updatedFields).forEach((key, index) => {
            fields.push(`${key} = $${index + 1}`);
            params.push(updatedFields[key as keyof Partial<User>]); //ainda não entendi muuuito bem, assim, essa contrução
        });

        const text = `UPDATE users SET ${fields.join(', ')} WHERE id = $${params.length + 1} RETURNING *`;
        params.push(id);
        
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