import { Request, Response } from "express";
import { Budget } from "../models/Budget";

class BudgetController {
    static getAll = async (req : Request, res : Response) => {
        try {
            const budgets = await Budget.findAll()
            res.status(200).json(budgets)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static create = async (req : Request, res : Response) => {
        console.log(req.body)
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).send("Presupuesto creado correctamente")
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static getById = async (req : Request, res : Response) => {
        console.log("desde get by id")
    }

    static updateById = async (req : Request, res : Response) => {
        console.log("desde update by id")
    }

    static deleteById = async (req : Request, res : Response) => {
        console.log("desde delete by id")
    }
}


export default BudgetController;