import { usersService } from "../services/usersService.js";
import { Request, Response } from "express";
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
};

export const usersController = {
    getAllUsers: async(req: Request, res: Response): Promise<void> => {
        //A declaração Promise<void> indica que a função retorna uma promessa que não produz um valor específico (tipo void). Isso é comum em funções assíncronas que não têm um valor de retorno relevante.
        try {
            const allUsers = await usersService.getAllUsers();

            if(allUsers.length === 0) {
                res.status(204).json(
                    {
                        'success': true,
                        'data': 'Não há nenhum usuário no banco de dados'
                    }
                );
            } else {
                const mappedUsers = allUsers.map(user => ({
                    id: user.id,
                    email: user.email,
                    name: user.name
                }));

                res.status(200).json(mappedUsers);
            }
        } catch(err: any) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            res.status(500).json(
                {
                    'success': false, 	
                    'error': 'Erro ao recuperar todos os usuários',
                }
            );
        }
    },
    //curl -X GET http://localhost:3000/users

    getUserById: async(req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        try {
            const userById = await usersService.getUserById(id);
            if(userById.length === 0){
                res.status(204).json(
                    {
                        'sucess': true,
                        'data': 'Não há nenhum usuário com o id especificado no banco de dados'
                    }
                );
            } else {
                res.status(200).json(
                    {
                        'id': userById[0].id,
                        'email': userById[0].email,
                        'name': userById[0].name
                    }
                );
            }
        } catch(err: any) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao recuperar usuário a partir de id',
                }
            );
        }
    },
    //curl -X GET http://localhost:3000/users/1

    getUserByEmail: async (req: Request, res: Response) => {
        const { email } = req.body;
        try {
            const userByEmail = await usersService.getUserByEmail(email);
            res.status(200).json(
                {
                    'success': true,
                    'data': userByEmail,
                }
            );
        } catch(err: any) {
            console.error(`Erro ao recuperar usuário com email ${email}: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao recuperar usuário a partir de email',
                }
            );
        }
    },
    
    createUser: async(req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const createdUser = await usersService.createUser(email, name, hashedPassword);
            res.status(200).json(
                {
                    'id': createdUser[0].id,
                    'email': createdUser[0].email,
                    'name': createdUser[0].name
                }
            );
        } catch(err: any) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao criar novo usuário no banco de dados',
                }
            );
        }
    },
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

    updateUser: async(req: Request, res: Response) => {
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
            const updatedFields: Partial<User> = req.body;
            
            const updatedUser = await usersService.updateUser(id, updatedFields);
            res.status(200).json(
                {
                    'id': updatedUser[0].id,
                    'email': updatedUser[0].email,
                    'name': updatedUser[0].name
                }
            );
        } catch(err: any) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao atualizar usuário no banco de dados',
                }
            );
        }
    },
    //curl -X PATCH http://localhost:3000/users/2 \
    //-H "Content-Type: application/json" \
    //-b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODE5ODM0LCJleHAiOjE3MTY4MjM0MzR9.1HPyaoOafVEC87I9_pOkLoWE4a1FZ9MVv9XG6qSbJd4" \
    //-d '{
    //"email": "exemplom@mail.jp"
    //}'

    deleteUser: async(req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        
        if (req.user && req.user.id === id) {
            try {
                const deletedUser = await usersService.deleteUser(id);
                res.status(200).json({
                    'id': deletedUser[0].id,
                    'email': deletedUser[0].email,
                    'name': deletedUser[0].name
                });
            } catch (err: any) {
                console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
                res.status(500).json({
                    'success': false,
                    'error': 'Erro ao deletar usuário do banco de dados',
                });
            }
        } else {
            return res.status(403).json({
                'success': false,
                'error': 'Você não tem permissão para excluir este usuário.'
            });
        }
    }
    //curl -X DELETE http://localhost:3000/users/1 \
    //-b "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzE2ODE5ODM0LCJleHAiOjE3MTY4MjM0MzR9.1HPyaoOafVEC87I9_pOkLoWE4a1FZ9MVv9XG6qSbJd4" \
};