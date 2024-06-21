import express, { NextFunction, Request, Response, Router } from 'express';

import AuthController from '@/packages/controllers/auth.controller';
import { loginSchema } from '@/validations/auth.schema';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const authRouter: Router = express.Router();

authRouter.post(
    '/login',
    validationMiddleware(loginSchema),
    (req: Request, res: Response, next: NextFunction) => AuthController.Login(req, res, next)
);

authRouter.get(
    '/logout',
    (_req: Request, res: Response, _next: NextFunction) => AuthController.Logout(res)
)

// Export the router
export default authRouter;