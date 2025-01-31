import { AuthController } from './../controllers/AuthController';
import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from '../middlewares/validation';
import { limiter } from '../config/limiter';
import { authenticate } from '../middlewares/auth';

const router = Router();
router.use(limiter)

router.post('/create-acount',
    [
        body('name')
            .notEmpty().withMessage('El nombre es requerido'),
        body('password')
            .isLength({ min: 8 }).withMessage('La contraseña debe tener minimo 8 caracteres'),
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
            .isLength({ min: 6, max: 6 }).withMessage('El token es requerido y debe tener 6 caracteres'),
    ],
    handleInputErrors,
    AuthController.confirmAccount)

router.post('/login',
    [
        body('email')
            .notEmpty().withMessage('El email es requerido')
            .isEmail().withMessage('El e-mail no es valido'),
        body('password')
            .notEmpty().withMessage('El password es obligatorio')
    ],
    handleInputErrors,
    AuthController.login)

router.post('/forgot-password',
    [
        body('email')
            .notEmpty().withMessage('El email es requerido')
            .isEmail().withMessage('El e-mail no es valido'),
    ],
    handleInputErrors,
    AuthController.forgotPassword
)


router.post('/validate-token',
    [
        body('token')
            .notEmpty().withMessage('El token es requerido')
            .isLength({ min: 6, max: 6 }).withMessage('El token es requerido y debe tener 6 caracteres'),
    ],
    handleInputErrors,
    AuthController.validateToken
)

router.post('/reset-password/:token',
    [
        param('token')
            .notEmpty().withMessage('El token es requerido')
            .isLength({ min: 6, max: 6 }).withMessage('El token es requerido y debe tener 6 caracteres'),
        body('password')
            .isLength({ min: 8 }).withMessage('La contraseña debe tener minimo 8 caracteres'),
    ],
    handleInputErrors,
    AuthController.resetPasswordWithToken)

router.get('/user',
    authenticate,
    AuthController.user)

router.post('/update-password',
    authenticate,
    [
        body('currentPassword')
            .notEmpty().withMessage('Se debe ingresar la contraseña actual'),
        body('password')
            .isLength({ min: 8 }).withMessage('La contraseña debe tener minimo 8 caracteres'),
    ],
    handleInputErrors,
    AuthController.updateCurrentUserPassword)

export default router;