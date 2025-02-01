import { AuthEmail } from './../emails/AuthEmail';
import { Response, Request } from 'express';
import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/auth';
import { generateToken } from '../utils/tokens';
import { generateJWT, verifyJWT } from '../utils/jwt';


export class AuthController {
    static async createAccount(req: Request, res: Response) {
        try {
            const exist = await User.findOne({ where: { email: req.body.email } });
            if (exist) {
                res.status(409).json({ error: 'El email ya esta registrado' })
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
            res.status(500).json({ error: 'Error al crear usuario' })
        }
    }

    static async confirmAccount(req: Request, res: Response) {
        try {
            const { token } = req.body
            const user = await User.findOne({ where: { token } })
            if (!user) {
                res.status(404).json({ error: 'Token invalido' })
                return
            }

            user.confirmed = true
            user.token = null
            await user.save()
            res.status(200).json({ message: 'Cuenta confirmada correctamente' })
            return
        } catch (error) {
            res.status(500).json({ error: 'Error al confirmar cuenta' })
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const exists = await User.findOne({ where: { email } })
            if (!exists) {
                res.status(404).json({ error: 'Usuario no encontrado' })
                return
            }
            if (!exists.confirmed) {
                res.status(403).json({ error: 'Usuario no confirmado' })
                return
            }
            const isPasswordValid = await comparePassword(password, exists.password)
            if (!isPasswordValid) {
                res.status(403).json({ error: 'Contraseña incorrecta' })
                return
            }
            const jwt = generateJWT({ id: exists.id })
            res.send(jwt)
            return
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesion' })
        }
    }

    static async forgotPassword(req: Request, res: Response) {
        try {
            const { email } = req.body
            const exists = await User.findOne({ where: { email } })
            if (!exists) {
                res.status(404).json({ error: 'Usuario no encontrado' })
                return
            }
            const token = generateToken()
            exists.token = token
            await exists.save()

            await AuthEmail.sendPasswordResetToken({
                name: exists.name,
                email: exists.email,
                token: exists.token
            })
            res.status(200).json({ message: 'Email enviado' })
        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesion' })
        }
    }

    static async validateToken(req: Request, res: Response) {
        try {
            const { token } = req.body
            const user = await User.findOne({ where: { token } })
            if (!user) {
                res.status(404).json({ error: 'Token invalido' })
                return
            }
            res.status(200).json({ message: 'Token valido' })

        } catch (error) {
            res.status(500).json({ error: 'Error al iniciar sesion' })
        }
    }

    static async resetPasswordWithToken(req: Request, res: Response) {
        try {
            const { token } = req.params
            const user = await User.findOne({ where: { token } })
            if (!user) {
                res.status(404).json({ error: 'Token invalido' })
                return
            }
            const { password } = req.body
            user.password = await hashPassword(password)
            user.token = null
            await user.save()
            res.status(200).send('Contraseña actualizada correctamente')
            return
        } catch (error) {
            res.status(500).json({ error: 'Error al cambiar contraseña' })
        }
    }

    static async user(req: Request, res: Response) {
        res.json(req.user)
    }

    static async updateCurrentUserPassword(req: Request, res: Response) {
        try {
            const { password, currentPassword } = req.body
            const { id } = req.user
            const user = await User.findOne({ where: { id } })

            const validCurrentPassword = await comparePassword(currentPassword, user.password)
            if (!validCurrentPassword) {
                res.status(401).json({ error: 'Contraseña actual incorrecta' })
                return
            }

            req.user.password = await hashPassword(password)
            await req.user.save()
            res.status(200).json({ message: 'Contraseña actualizada correctamente' })
            return
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar contraseña' })
        }

    }

    static async checkPassword(req: Request, res: Response) {
        try {
            const { password } = req.body
            const { id } = req.user
            const user = await User.findOne({ where: { id } })

            const validCurrentPassword = await comparePassword(password, user.password)
            if (!validCurrentPassword) {
                res.status(401).json({ error: 'Contraseña incorrecta' })
                return
            }
            res.status(200).json({ message: 'Contraseña valida'})
            return
        } catch (error) {
            res.status(500).json({ error: 'Error al verificar contraseña' })
        }

    }
}