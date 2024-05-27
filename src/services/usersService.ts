import { usersRepository } from "../repositories/usersRepository.js";

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
};

export const usersService = {
    getAllUsers: async() => {
        try {
            return await usersRepository.getAllUsers();
        } catch(err: any) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            throw err;
        }
    },

    getUserById: async(id: number) => {
        try {
            return await usersRepository.getUserById(id);
        } catch(err: any) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    },

    getUserByEmail: async (email: string) => {
        try {
            return await usersRepository.getUserByEmail(email);
        } catch(err: any) {
            console.error(`Erro ao recuperar usuário com email ${email}: ${err.message}`);
            throw err;
        }
    },

    createUser: async(email: string, name: string, password: string) => {
        try {
            return await usersRepository.createUser(email, name, password);
        } catch(err: any) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }  
    },

    updateUser: async(id: number, updatedFields: Partial<User>) => {
        try {
            return await usersRepository.updateUser(id, updatedFields);
        } catch(err: any) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    },

    deleteUser: async(id: number) => {
        try {
            return await usersRepository.deleteUser(id);
        } catch(err: any) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    }
};