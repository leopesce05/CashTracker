import { AuthController } from './../controllers/AuthController';
import {Router} from 'express';

const router = Router();


router.post('/create-acount',AuthController.createAccount)

export default router;