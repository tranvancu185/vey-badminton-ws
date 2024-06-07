import express, { Router, Request, Response } from 'express';
import { AuthController } from './auth-controller';
import { ILoginResponse } from './auth-interfaces';
import validationMiddleware from '@/middlewares/validation-middleware';

import { loginSchema } from '@/validations/auth.schema';
// Create a new router instance
const authRouter: Router = express.Router();
const authController = new AuthController();

authRouter.post('/login', async (req: Request, res: Response) => {
    const respone: ILoginResponse = await authController.Login(req);
    res.json(respone)
});

// Export the router
export default authRouter;