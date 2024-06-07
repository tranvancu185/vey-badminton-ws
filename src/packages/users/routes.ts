import express, { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middlewares/validation-middleware';

import { UserController } from './user-controller';
import { filterSchema } from '@/validations/user.schema';
// Create a new router instance
const userRouter: Router = express.Router();
// Define your routes

userRouter.get('/', validationMiddleware(filterSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.GetListUsers(req, res, next);
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.GetDetailUser(req, res, next);
});

userRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.CreateUser(req, res, next);
});

userRouter.put('/:id/edit', async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.UpdateUser(req, res, next);
});

userRouter.delete('/:id/delete', async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.DeleteUser(req, res, next);
});

// Export the router
export default userRouter;