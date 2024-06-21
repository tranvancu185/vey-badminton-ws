import express, { NextFunction, Request, Response, Router } from 'express';
import { filterSchema, registerUserSchema } from '@/validations/user.schema';

import UserController from '@/packages/controllers/user.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const userRouter: Router = express.Router();
// Define your routes

userRouter.get(
    '/',
    checkPermission(['users_list']),
    validationMiddleware(filterSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.GetListUsers(req, res, next)
);

userRouter.get(
    '/:id',
    checkPermission(['users_view']),
    (req: Request, res: Response, next: NextFunction) => UserController.GetDetailUser(req, res, next)
);

userRouter.post(
    '/create',
    checkPermission(['users_create']),
    validationMiddleware(registerUserSchema),
    (req: Request, res: Response, next: NextFunction) => UserController.CreateUser(req, res, next)
);

userRouter.put(
    '/:id/edit',
    checkPermission(['users_edit']),
    (req: Request, res: Response, next: NextFunction) => UserController.UpdateUser(req, res, next)
);

userRouter.delete(
    '/:id/delete',
    checkPermission(['users_delete']),
    (req: Request, res: Response, next: NextFunction) => UserController.DeleteUser(req, res, next)
);

// Export the router
export default userRouter;