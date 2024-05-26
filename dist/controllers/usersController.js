var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { usersService } from "../services/usersService.js";
export const usersController = {
    getAllUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        //A declaração Promise<void> indica que a função retorna uma promessa que não produz um valor específico (tipo void). Isso é comum em funções assíncronas que não têm um valor de retorno relevante.
        try {
            const allUsers = yield usersService.getAllUsers();
            if (allUsers.length === 0) {
                res.status(200).json({
                    'success': true,
                    'data': 'Não há nenhum usuário no banco de dados'
                });
            }
            else {
                res.status(200).json({
                    'success': true,
                    'data': allUsers,
                });
            }
        }
        catch (err) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            res.status(500).json({
                'success': false,
                'error': 'Erro ao recuperar todos os usuários',
            });
        }
    }),
    //curl -X GET http://localhost:3000/users
    getUserById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const userById = yield usersService.getUserById(id);
            if (userById.length === 0) {
                res.status(200).json({
                    'sucess': true,
                    'data': 'Não há nenhum usuário com o id especificado no banco de dados'
                });
            }
            else {
                res.status(200).json({
                    'success': true,
                    'data': userById,
                });
            }
        }
        catch (err) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            res.status(500).json({
                'success': false,
                'error': 'Erro ao recuperar usuário a partir de id',
            });
        }
    }),
    //curl -X GET http://localhost:3000/users/1
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, name, password } = req.body;
        try {
            const createdUser = yield usersService.createUser(email, name, password);
            res.status(200).json({
                'sucess': true,
                'id do usuário': createdUser[0].id,
                'email do usuário': createdUser[0].email,
                'nome do usuário': createdUser[0].name
            });
        }
        catch (err) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            res.status(500).json({
                'success': false,
                'error': 'Erro ao criar novo usuário no banco de dados',
            });
        }
    }),
    //curl -X POST http://localhost:3000/users \
    //-H "Content-Type: application/json" \
    //-d '{
    //"email": "exemplo@mail.com",
    //"name": "Ana",
    //"password": "123abc"
    //}'
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const outdatedUser = yield usersService.getUserById(id);
        const { email } = req.body;
        const emailToUse = email || outdatedUser[0].email;
        const { name } = req.body;
        const nameToUse = name || outdatedUser[0].name;
        const { password } = req.body;
        const passwordToUse = password || outdatedUser[0].password;
        try {
            const updatedUser = yield usersService.updateUser(id, emailToUse, nameToUse, passwordToUse);
            res.status(200).json({
                'success': true,
                'data': updatedUser,
            });
        }
        catch (err) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json({
                'success': false,
                'error': 'Erro ao atualizar usuário no banco de dados',
            });
        }
    }),
    //curl -X PUT http://localhost:3000/users/1 \
    //-H "Content-Type: application/json" \
    //-d '{
    //"email": "exemplo2@mail.com",
    //"name": "Ana Luiza"
    //}'
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const deletedUser = yield usersService.deleteUser(id);
            res.status(200).json({
                'success': true,
                'data': deletedUser,
            });
        }
        catch (err) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json({
                'success': false,
                'error': 'Erro ao deletar usuário do banco de dados',
            });
        }
    })
    //curl -X DELETE http://localhost:3000/users/2
};
