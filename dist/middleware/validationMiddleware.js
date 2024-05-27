import { body } from 'express-validator';
export const validateUserCreation = [
    body('email')
        .isEmail().withMessage('O campo "email" deve seguir um padrão válido.'),
    body('name')
        .isLength({ min: 4 }).withMessage('O campo "name" deve ter no mínimo 4 caracteres.')
        .matches(/^[A-Za-z\s]+$/).withMessage('O campo "name" deve aceitar apenas letras e espaços em branco.'),
    body('password')
        .isLength({ min: 8 }).withMessage('O campo "password" deve ter no mínimo 8 caracteres.')
        .matches(/[A-Za-z]/).withMessage('O campo "password" deve conter pelo menos uma letra.')
        .matches(/[0-9]/).withMessage('O campo "password" deve conter pelo menos um número.')
];
export const validateUserUpdate = [
    body('email')
        .optional()
        .isEmail().withMessage('O campo "email" deve seguir um padrão válido.'),
    body('name')
        .optional()
        .isLength({ min: 4 }).withMessage('O campo "name" deve ter no mínimo 4 caracteres.')
        .matches(/^[A-Za-z\s]+$/).withMessage('O campo "name" deve aceitar apenas letras e espaços em branco.'),
    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('O campo "password" deve ter no mínimo 8 caracteres.')
        .matches(/[A-Za-z]/).withMessage('O campo "password" deve conter pelo menos uma letra.')
        .matches(/[0-9]/).withMessage('O campo "password" deve conter pelo menos um número.')
];
