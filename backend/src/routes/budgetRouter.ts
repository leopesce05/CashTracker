import { Router } from 'express';
import { body , param} from 'express-validator';

import BudgetController from '../controllers/BudgerController';
import { handleInputErrors } from '../middlewares/validation';
import { validateBudgetExists, validateBudgetId } from '../middlewares/budget';
const router = Router();

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

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

router.get('/:budgetId', BudgetController.getById)


router.put('/:budgetId',
    [
        body('name')
            .notEmpty().withMessage('El nombre es requerido'),
        body('amount')
            .isNumeric().withMessage('El campo amount debe ser numérico')
            .custom((value) => value > 0).withMessage('El campo amount debe ser mayor a 0'),
    ],
    handleInputErrors,
    BudgetController.updateById)


router.delete('/:budgetId', BudgetController.deleteById)


export default router;