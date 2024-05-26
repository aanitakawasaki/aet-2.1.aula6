import { usersService } from "../services/usersService.js";
import { Request, Response } from "express";

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
                res.status(200).json(
                    {
                        'success': true, 	
                        'data': allUsers,
                    }
                );
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

        const outdatedUser = await usersService.getUserById(id);
        const { email } = req.body;
        const emailToUse = email || outdatedUser[0].email;
        const { name } = req.body;
        const nameToUse = name || outdatedUser[0].name;
        const { password } = req.body;
        const passwordToUse = password || outdatedUser[0].password;

        try {
            const updatedUser = await usersService.updateUser(id, emailToUse, nameToUse, passwordToUse);
            res.status(200).json(
                {
                    'success': true,
                    'data': updatedUser,
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
    //curl -X PUT http://localhost:3000/users/1 \
    //-H "Content-Type: application/json" \
    //-d '{
    //"email": "exemplo2@mail.com",
    //"name": "Ana Luiza"
    //}'

    deleteUser: async(req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        try {
            const deletedUser = await usersService.deleteUser(id);
            res.status(200).json(
                {
                    'success': true,
                    'data': deletedUser,
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