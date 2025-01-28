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
            res.status(200).json(budgets)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static create = async (req : Request, res : Response) => {
        try {
            const budget = new Budget(req.body)
            await budget.save()
            res.status(201).send("Presupuesto creado correctamente")
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static getById = async (req : Request, res : Response) => {
        try {
            const budget = await Budget.findOne({where: {id: req.params.id}})
            if(!budget){
                res.status(404).json({error: "Presupuesto no encontrado"})
                return
            }
            res.status(200).json(budget)
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static updateById = async (req : Request, res : Response) => {
        console.log("desde update by id")
    }

    static deleteById = async (req : Request, res : Response) => {
        console.log("desde delete by id")
    }
}


export default BudgetController;