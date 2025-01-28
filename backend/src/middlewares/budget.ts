import { Response, Request, NextFunction } from 'express';
import { param, body, validationResult } from "express-validator";
import { Budget } from '../models/Budget';

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {

    await param('budgetId')
        .isInt().withMessage('El id debe ser un número')
        .custom((value) => value > 0).withMessage('ID no valido').run(req)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateBudgetExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)
        if (!budget) {
            res.status(404).json({ error: "Presupuesto no encontrado" })
            return
        }
        req.budget = budget
        next()
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

