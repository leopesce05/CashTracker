import type { Request, Response } from 'express'
import { Expense } from '../models/Expense';
import { Budget } from '../models/Budget';

export class ExpensesController {

    static create = async (req: Request, res: Response) => {
        try {
            const budgetId = req.budget.id;
            const expense = new Expense(req.body);
            expense.budgetId = budgetId;
            await expense.save();
            res.status(201).json({ message: 'Gasto creado correctamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el gasto' });
        } 
    }

    static getById = async (req: Request, res: Response) => {
        res.status(200).json(req.expense);
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body);
        res.status(200).json({ message: 'Gasto actualizado correctamente' });
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy();
        res.status(200).json({ message: 'Gasto eliminado' });
    }
}

