import express, { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middlewares/validation-middleware';
import checkPermission from '@/middlewares/checkPermission-middleware';

import { UserController } from './user-controller';
import { filterSchema } from '@/validations/user.schema';
// Create a new router instance
const userRouter: Router = express.Router();
// Define your routes

userRouter.get('/', checkPermission(['users_list']), validationMiddleware(filterSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.GetListUsers(req, res, next);
});

userRouter.get('/:id', checkPermission(['user_view']), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.GetDetailUser(req, res, next);
});

userRouter.post('/create', checkPermission(['users_create']), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.CreateUser(req, res, next);
});

userRouter.put('/:id/edit', checkPermission(['users_edit']), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.UpdateUser(req, res, next);
});

userRouter.delete('/:id/delete', checkPermission(['users_delete']), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.DeleteUser(req, res, next);
});

// Export the router
export default userRouter;