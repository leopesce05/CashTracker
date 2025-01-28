import { Router } from 'express';
import { body , param} from 'express-validator';

import BudgetController from '../controllers/BudgerController';
import { handleInputErrors } from '../middlewares/validation';
import { validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middlewares/budget';

const router = Router();

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)

router.get('/', BudgetController.getAll)

router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create
)

router.get('/:budgetId', BudgetController.getById)

router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateById)


router.delete('/:budgetId', BudgetController.deleteById)


export default router;