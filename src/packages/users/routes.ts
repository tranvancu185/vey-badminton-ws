import express, { NextFunction, Request, Response, Router } from 'express';

import { UserController } from './user.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import { filterSchema } from '@/validations/user.schema';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const userRouter: Router = express.Router();
// Define your routes

userRouter.get('/', checkPermission(['users_list']), validationMiddleware(filterSchema), async (req: Request, res: Response, next: NextFunction) => {
    const userController = new UserController();
    await userController.GetListUsers(req, res, next);
});

userRouter.get('/:id', checkPermission(['users_view']), async (req: Request, res: Response, next: NextFunction) => {
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