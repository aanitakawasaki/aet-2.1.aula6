var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersService } from './usersService.js';
;
const SECRET_KEY = process.env.SECRET_KEY;
export const authService = {
    login: (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('No authService:', email, password);
        const user = yield usersService.getUserByEmail(email);
        console.log('No authService (o user):', user);
        console.log(bcrypt.compareSync(password, user.password));
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Email ou senha inválidos');
        }
        if (SECRET_KEY) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
            console.log({ id: user.id, token });
            return { id: user.id, token };
        }
        else {
            console.error('Chave secreta JWT não definida');
        }
    })
};
