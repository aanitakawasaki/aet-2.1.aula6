import { usersService } from "../services/usersService.js";
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

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
                res.status(200).json(
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
                res.status(200).json(
                    {
                        'sucess': true,
                        'data': 'Não há nenhum usuário com o id especificado no banco de dados'
                    }
                );
            } else {
                res.status(200).json(
                    {
                        'success': true,
                        'data': userById,
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
    
    createUser: async(req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, name, password } = req.body;

        try {
            const createdUser = await usersService.createUser(email, name, password);
            res.status(200).json(
                {
                    'id do usuário': createdUser[0].id,
                    'email do usuário': createdUser[0].email,
                    'nome do usuário': createdUser[0].name
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
    //"email": "exemplo@mail.com",
    //"name": "Ana",
    //"password": "123abc"
    //}'

    updateUser: async(req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        try {
            const { email, name, password } = req.body;
            const updatedFields: Partial<User> = {};

            if (email !== undefined) {
                updatedFields.email = email;
            }
    
            if (name !== undefined) {
                updatedFields.name = name;
            }
    
            if (password !== undefined) {
                updatedFields.password = password;
            }

            const updatedUser = await usersService.updateUser(id, updatedFields);
            res.status(200).json(
                {
                    'id do usuário': updatedUser[0].id,
                    'email do usuário': updatedUser[0].email,
                    'nome do usuário': updatedUser[0].name
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
    //curl -X PATCH http://localhost:3000/users/1 \
    //-H "Content-Type: application/json" \
    //-d '{
    //"email": "exemplo2y@mail.com"
    //}'

    deleteUser: async(req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        try {
            const deletedUser = await usersService.deleteUser(id);
            res.status(200).json(
                {
                    'id do usuário': deletedUser[0].id,
                    'email do usuário': deletedUser[0].email,
                    'nome do usuário': deletedUser[0].name
                }
            );
        } catch(err: any) {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao deletar usuário do banco de dados',
                }
            );
        }
    }
    //curl -X DELETE http://localhost:3000/users/2
};