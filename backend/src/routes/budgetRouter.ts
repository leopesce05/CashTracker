import { Router } from 'express';
import { body , param} from 'express-validator';

import BudgetController from '../controllers/BudgerController';
import { handleInputErrors } from '../middlewares/validation';
const router = Router();

router.get('/', BudgetController.getAll)


router.post('/',
    [
        body('name')
            .notEmpty().withMessage('El nombre es requerido'),
        body('amount')
            .isNumeric().withMessage('El campo amount debe ser numérico')
            .custom((value) => value > 0).withMessage('El campo amount debe ser mayor a 0'),
    ],
    handleInputErrors,
    BudgetController.create
)


router.get('/:id',
    [
        param('id')
            .isInt().withMessage('El id debe ser un número')
            .custom((value) => value > 1).withMessage('ID no valido'),
    ],  
    handleInputErrors,
    BudgetController.getById)


router.put('/:id',
    [
        param('id')
            .isInt().withMessage('El id debe ser un número')
            .custom((value) => value > 0).withMessage('ID no valido'),
        body('name')
            .notEmpty().withMessage('El nombre es requerido'),
        body('amount')
            .isNumeric().withMessage('El campo amount debe ser numérico')
            .custom((value) => value > 0).withMessage('El campo amount debe ser mayor a 0'),
    ],
    handleInputErrors,
    BudgetController.updateById)


router.delete('/:id', BudgetController.deleteById)


export default router;