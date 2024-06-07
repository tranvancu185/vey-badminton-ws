import express, { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from './auth-controller';

// Create a new router instance
const authRouter: Router = express.Router();

authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const authController = new AuthController();
    await authController.Login(req, res, next);
});

authRouter.get('/logout', async (_: Request, res: Response) => {
    const authController = new AuthController();
    await authController.Logout(res);
})

// Export the router
export default authRouter;