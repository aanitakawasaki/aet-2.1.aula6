import jwt from 'jsonwebtoken';
//Ainda não entendi isso muito bem. Fiz para solucionar o erro que estava dando no 'req.user = decoded' abaixo ("Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.ts(2339) any").
const SECRET_KEY = process.env.SECRET_KEY;
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }
    try {
        if (SECRET_KEY) {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            next();
        }
        else {
            console.error('Chave secreta JWT não definida');
        }
    }
    catch (err) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};
