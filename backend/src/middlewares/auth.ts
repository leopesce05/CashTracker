import {Request,Response, NextFunction } from 'express';
import { verifyJWT } from "../utils/jwt";
import { User } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization;

    if (!bearer) {
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }

    const [,token] = bearer.split(' ');

    if (!token) {
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }

    const payload = verifyJWT(token)
    if (!payload) {
        const error = new Error('Token invalido')
        res.status(401).json({error: error.message})
        return
    }

    if (payload['id']) {
        const user = await User.findByPk(payload['id'])
        if(!user){
            const error = new Error('Usuario no encontrado')
            res.status(404).json({error: error.message})
            return
        }
        req.user = user
        next()
    }

}