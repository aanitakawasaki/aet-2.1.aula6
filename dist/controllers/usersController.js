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
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
;
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
                const mappedUsers = allUsers.map(user => ({
                    id: user.id,
                    email: user.email,
                    name: user.name
                }));
                res.status(200).json(mappedUsers);
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
    getUserByEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = req.body;
        try {
            const userByEmail = yield usersService.getUserByEmail(email);
            res.status(200).json({
                'success': true,
                'data': userByEmail,
            });
        }
        catch (err) {
            console.error(`Erro ao recuperar usuário com email ${email}: ${err.message}`);
            res.status(500).json({
                'success': false,
                'error': 'Erro ao recuperar usuário a partir de email',
            });
        }
    }),
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, name, password } = req.body;
        const hashedPassword = yield bcrypt.hash(password, 10);
        try {
            const createdUser = yield usersService.createUser(email, name, hashedPassword);
            res.status(200).json({
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
    //"email": "exemploi@mail.br",
    //"name": "Iago",
    //"password": "oito1234"
    //}'
    //curl -X POST http://localhost:3000/users \
    //-H "Content-Type: application/json" \
    //-d '{
    //"email": "exemplom@mail.br",
    //"name": "Marina",
    //"password": "doze1234"
    //}'
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // const { email, name, password } = req.body;
            // const updatedFields: Partial<User> = {};
            // if (email !== undefined) {
            //     updatedFields.email = email;
            // }
            // if (name !== undefined) {
            //     updatedFields.name = name;
            // }
            // if (password !== undefined) {
            //     updatedFields.password = password;
            // }
            //isso tudo pode ser substituído por simplesmente isso:
            const updatedFields = req.body;
            console.log('No usersController:', updatedFields);
            const updatedUser = yield usersService.updateUser(id, updatedFields);
            res.status(200).json({
                'id do usuário': updatedUser[0].id,
                'email do usuário': updatedUser[0].email,
                'nome do usuário': updatedUser[0].name
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
    //curl -X PATCH http://localhost:3000/users/2 \
    //-H "Content-Type: application/json" \
    //-b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODE5ODM0LCJleHAiOjE3MTY4MjM0MzR9.1HPyaoOafVEC87I9_pOkLoWE4a1FZ9MVv9XG6qSbJd4" \
    //-d '{
    //"email": "exemplom@mail.jp"
    //}'
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const deletedUser = yield usersService.deleteUser(id);
            res.status(200).json({
                'id do usuário': deletedUser[0].id,
                'email do usuário': deletedUser[0].email,
                'nome do usuário': deletedUser[0].name
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
    //curl -X DELETE http://localhost:3000/users/1 \
    //-b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODE5ODM0LCJleHAiOjE3MTY4MjM0MzR9.1HPyaoOafVEC87I9_pOkLoWE4a1FZ9MVv9XG6qSbJd4" \
};
