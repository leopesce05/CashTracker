import { Response, Request, NextFunction } from 'express';
import { param, body, validationResult } from "express-validator";
import { Expense } from '../models/Expense';

declare global {
    namespace Express {
        interface Request {
            expense?: Expense
        }
    }
}


export const validateExpenseId = async (req: Request, res: Response, next: NextFunction) => {

    await param('expenseId')
        .notEmpty().withMessage('El id es requerido')
        .isInt().withMessage('El id debe ser un número')
        .custom((value) => value > 0).withMessage('ID no valido').run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateExpenseExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { expenseId } = req.params
        const expense = await Expense.findByPk(expenseId)
        if (!expense) {
            res.status(404).json({ error: "Gasto no encontrado" })
            return
        }
        req.expense = expense
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export const validateExpenseInput = async (req: Request, res: Response, next: NextFunction) => {
    await body('name')
        .notEmpty().withMessage('El nombre es requerido').run(req)
    await body('amount')
        .isNumeric().withMessage('El gasto debe ser numérico')
        .custom((value) => value > 0).withMessage('El campo amount debe ser mayor a 0').run(req)
    next()
}
