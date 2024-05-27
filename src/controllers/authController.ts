import { Request, Response } from 'express';
import { authService } from '../services/authService.js';

export const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        console.log('no authController:', email, password)
  
        try {
            const loginResult = await authService.login(email, password);
            if(loginResult) {
                console.log(loginResult);
                const { id, token } = loginResult;
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                res.status(200).json({ id });
            } else {
                res.status(401).json({ error: 'Email ou senha inválidos' });
            }
        } catch (err: any) {
            res.status(401).json({ error: 'Email ou senha inválidos!!!' });
        }
    },
    //curl -X POST http://localhost:3000/users/login \
    //-H "Content-Type: application/json" \
    //-d '{"email": "exemploi@mail.br", "password": "oito1234"}'
  
    logout: (req: Request, res: Response) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout bem-sucedido' });
    }
    //curl -X DELETE http://localhost:3000/users/logout
  };