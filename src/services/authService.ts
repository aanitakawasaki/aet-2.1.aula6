import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersService } from './usersService.js';

interface User {
    id: number;
    email: string;
    name: string;
    password: string;
};

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

export const authService = {
    login: async (email: string, password: string) => {
        const user = await usersService.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Email ou senha inválidos');
        }
  
        if(SECRET_KEY) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            return { id: user.id, token };
        } else {
            console.error('Chave secreta JWT não definida');
        } 
    }
  };