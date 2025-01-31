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

router.post('/confirm-account',
    [
        body('token')
            .notEmpty().withMessage('El token es requerido')    
            .isLength({min:6, max:6}).withMessage('El token es requerido y debe tener 6 caracteres'),
    ],
    handleInputErrors,
    AuthController.confirmAccount)

export default router;