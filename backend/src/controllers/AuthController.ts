import { Response,Request } from 'express';


export class AuthController {
    static async createAccount(req:Request, res:Response) {
        console.log('createAcount')
    }
}