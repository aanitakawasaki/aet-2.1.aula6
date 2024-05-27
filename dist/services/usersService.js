var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { usersRepository } from "../repositories/usersRepository.js";
;
export const usersService = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield usersRepository.getAllUsers();
        }
        catch (err) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            throw err;
        }
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield usersRepository.getUserById(id);
        }
        catch (err) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            throw err;
        }
    }),
    createUser: (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield usersRepository.createUser(email, name, password);
        }
        catch (err) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            throw err;
        }
    }),
    updateUser: (id, updatedFields) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield usersRepository.updateUser(id, updatedFields);
        }
        catch (err) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    }),
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield usersRepository.deleteUser(id);
        }
        catch (err) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            throw err;
        }
    })
};
