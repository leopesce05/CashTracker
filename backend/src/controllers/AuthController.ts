import { Response,Request } from 'express';
import { User } from '../models/User';
import { hashPassword,comparePassword } from '../utils/auth';
import { generateToken } from '../utils/tokens';


export class AuthController {
    static async createAccount(req:Request, res:Response) {
        try {
            const exist = await User.findOne({ where: { email: req.body.email } });
            if (exist) {
                res.status(409 ).json({error: 'El email ya esta registrado'})
                return
            }
            const user = new User(req.body)
            user.password = await hashPassword(req.body.password)
            user.token = generateToken()
            await user.save()
            res.status(201).json(user)
            return
        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Error al crear usuario'})
        }
    }
}