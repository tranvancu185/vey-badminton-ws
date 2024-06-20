import express, { Router } from 'express';

import AuthController from './auth.controller';
import { loginSchema } from '@/validations/auth.schema';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const authRouter: Router = express.Router();

authRouter.post(
    '/login',
    validationMiddleware(loginSchema),
    (req, res, next) => AuthController.Login(req, res, next)
);

authRouter.get(
    '/logout',
    (_req, res, _next) => AuthController.Logout(res)
)

// Export the router
export default authRouter;