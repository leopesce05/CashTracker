import { Router } from 'express';
import { body } from 'express-validator';

import BudgetController from '../controllers/BudgerController';
import { handleInputErrors } from '../middlewares/validation';
const router = Router();

router.get('/', BudgetController.getAll)


router.post('/',
    [
        body('name').isString().notEmpty().withMessage('El nombre es requerido'),
        body('amount')
            .isNumeric().withMessage('El campo amount debe ser numérico')
            .custom((value) => value > 0).withMessage('El campo amount debe ser mayor a 0'),
    ],
    handleInputErrors,
    BudgetController.create
)


router.get('/:id', BudgetController.getById)


router.put('/:id', BudgetController.updateById)


router.delete('/:id', BudgetController.deleteById)


export default router;