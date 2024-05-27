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
        console.log('No authService:', email, password);
        const user = await usersService.getUserByEmail(email);
        console.log('No authService (o user):', user);

        console.log(bcrypt.compareSync(password, user.password))
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Email ou senha inválidos');
        }
  
        if(SECRET_KEY) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            console.log ({ id: user.id, token });
            return { id: user.id, token };
        } else {
            console.error('Chave secreta JWT não definida');
        } 
    }
  };