import { Request, Response } from "express";
import { Budget } from "../models/Budget";

class BudgetController {
    static getAll = async (req : Request, res : Response) => {
        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            //TODO: Implementar filtro de usuario autenticado

            res.status(200).json(budgets)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static create = async (req : Request, res : Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).json("Presupuesto creado correctamente")
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static getById = async (req : Request, res : Response) => {
        res.status(200).json(req.budget)
    }

    static updateById = async (req : Request, res : Response) => {
        try {
            await req.budget.update(req.body)
            res.status(200).json("Presupuesto actualizado correctamente")
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static deleteById = async (req : Request, res : Response) => {
        try {
            await req.budget.destroy()
            res.status(200).json("Presupuesto eliminado correctamente")
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}


export default BudgetController;