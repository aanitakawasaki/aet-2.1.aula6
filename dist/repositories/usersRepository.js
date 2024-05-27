var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { query, queryWithoutParams } from '../config/database.js';
;
export const usersRepository = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'SELECT * FROM users';
        try {
            const { rows } = yield queryWithoutParams(text);
            return rows;
        }
        catch (err) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            throw err;
        }
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'SELECT * FROM users WHERE id = $1';
        const params = [id];
        try {
            const { rows } = yield query(text, params);
            return rows;
        }
        catch (err) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    }),
    createUser: (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *;';
        const params = [email, name, password];
        try {
            const { rows } = yield query(text, params);
            return rows;
        }
        catch (err) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }
    }),
    updateUser: (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
        const fields = [];
        const params = [];
        Object.keys(updatedFields).forEach((key, index) => {
            fields.push(`${key} = $${index + 1}`);
            params.push(updatedFields[key]); //ainda não entendi muuuito bem, assim, essa contrução
        });
        const text = `UPDATE users SET ${fields.join(', ')} WHERE id = $${params.length + 1} RETURNING *`;
        params.push(id);
        try {
            const { rows } = yield query(text, params);
            return rows;
        }
        catch (err) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const text = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const params = [id];
        try {
            const { rows } = yield query(text, params);
            return rows;
        }
        catch (err) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    })
};
