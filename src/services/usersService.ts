import { usersRepository } from "../repositories/usersRepository.js";

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

    createUser: async(email: string, name: string, password: string) => {
        try {
            return await usersRepository.createUser(email, name, password);
        } catch(err: any) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }  
    },

    updateUser: async(id: number, email: string, name: string, password: string) => {
        try {
            return await usersRepository.updateUser(id, email, name, password);
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