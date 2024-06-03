import express, { Router, Request, Response } from 'express';
import { UserController } from './user-controller';
import authenticateToken from '@/middlewares/auth-middleware';
// Create a new router instance
const userRouter: Router = express.Router();
userRouter.use(authenticateToken);
// Define your routes

userRouter.get('/', async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.GetListUsers(req, res);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.GetDetailUser(req, res);
});

userRouter.post('/create', async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.CreateUser(req, res);
});

userRouter.put('/:id/edit', async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.UpdateUser(req, res);
});

userRouter.delete('/:id/delete', async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.DeleteUser(req, res);
});

// Export the router
export default userRouter;