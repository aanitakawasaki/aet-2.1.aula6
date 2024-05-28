var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { authService } from '../services/authService.js';
export const authController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const loginResult = yield authService.login(email, password);
            if (loginResult) {
                const { id, token } = loginResult;
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
                res.status(200).json({ id, token });
            }
            else {
                res.status(401).json({ error: 'Email ou senha inválidos' });
            }
        }
        catch (err) {
            res.status(401).json({ error: 'Email ou senha inválidos!!!' });
        }
    }),
    //curl -X POST http://localhost:3000/users/login \
    //-H "Content-Type: application/json" \
    //-d '{"email": "exemploi@mail.br", "password": "oito1234"}'
    //curl -X POST http://localhost:3000/users/login \
    //-H "Content-Type: application/json" \
    //-d '{"email": "exemplom@mail.br", "password": "doze1234"}'
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout bem-sucedido' });
    }
    //curl -X DELETE http://localhost:3000/users/logout
};
