import { Router } from 'express';

import BudgetController from '../controllers/BudgetController';
import { handleInputErrors } from '../middlewares/validation';
import { hasAccess, validateBudgetExists, validateBudgetId, validateBudgetInput } from '../middlewares/budget';
import { ExpensesController } from '../controllers/ExpenseController';
import { validateExpenseId,validateExpenseExists, validateExpenseInput } from '../middlewares/expense';
import { authenticate } from '../middlewares/auth';

const router = Router();

//Autenticacion necesaria para todas las rutas
router.use(authenticate)

//Middlewares
router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExists)
router.param('budgetId', hasAccess)


router.param('expenseId', validateExpenseId)
router.param('expenseId', validateExpenseExists)


//Rutas para budgets
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


//Rutas para expenses
router.post('/:budgetId/expenses', 
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.create)
router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)
router.put('/:budgetId/expenses/:expenseId', 
    validateExpenseInput,
    handleInputErrors,
    ExpensesController.updateById)
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)



export default router;