import { AuthController } from './../controllers/AuthController';
import {Router} from 'express';
import {body} from 'express-validator';
import { handleInputErrors } from '../middlewares/validation';

const router = Router();


router.post('/create-acount',
    [
        body('name')
            .notEmpty().withMessage('El nombre es requerido'),
        body('password')
            .isLength({min: 8}).withMessage('La contraseña debe tener minimo 8 caracteres'),
        body('email')
            .isEmail().withMessage('Email no valido')
    ],
    handleInputErrors,
    AuthController.createAccount
)

export default router;