import { AuthEmail } from './../emails/AuthEmail';
import { Response,Request } from 'express';
import { User } from '../models/User';
import { hashPassword,comparePassword } from '../utils/auth';
import { generateToken } from '../utils/tokens';
import { generateJWT } from '../utils/jwt';


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

            //ENVIO DE MAIL
            AuthEmail.sendConfirmationEmail(
                {
                    name: user.name, 
                    email: user.email, 
                    token: user.token
                }
            )

            res.status(201).json(user)
            return
        } catch (error) {
            res.status(500).json({error: 'Error al crear usuario'})
        }
    }

    static async confirmAccount(req:Request, res:Response) {
        try {
            const {token} = req.body
            const user = await User.findOne({ where: { token } })
            if (!user) {
                res.status(404).json({error: 'Token invalido'})
                return
            }

            user.confirmed = true
            user.token = null
            await user.save()
            res.status(200).json({message: 'Cuenta confirmada correctamente'})
            return
        } catch (error) {
            res.status(500).json({error: 'Error al confirmar cuenta'})
        }
    }

    static async login(req:Request, res:Response) {
        try {
            const {email, password} = req.body
            const exists = await User.findOne({ where: { email} })
            if (!exists) {
                res.status(404).json({error: 'Usuario no encontrado'})
                return
            }
            if (!exists.confirmed) {
                res.status(403).json({error: 'Usuario no confirmado'})
                return
            }
            const isPasswordValid = await comparePassword(password, exists.password)
            if (!isPasswordValid) {
                res.status(403).json({error: 'Contraseña incorrecta'})
                return
            }
            const jwt = generateJWT({id: exists.id})
            res.send(jwt)
            return
        } catch (error) {
            res.status(500).json({error: 'Error al iniciar sesion'})
        }
    }
}