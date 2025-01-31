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

    try {
        const {authorization} = req.headers
        if (!authorization) {
            res.status(403).json({error: 'Es necesario autorizacion'})
            return
        }
        const token = authorization.split(' ')[1]
        const validToken = verifyJWT(token)

        if(!validToken) {
            res.status(403).json({error: 'Token invalido'})
            return
        }
        if (!validToken['id']) {
            res.status(403).json({error: 'Token invalido'})
            return
        }
        req.user = await User.findByPk(validToken['id'],{
            attributes: ['id','name','email']
        })
        if (!req.user) {
            res.status(404).json({error: 'Usuario no encontrado'})
            return
        }
        next()
    } catch (error) {
        res.status(500).json({error: 'Error al iniciar sesion'})
    }

}