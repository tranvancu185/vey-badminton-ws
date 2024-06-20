import express, { NextFunction, Request, Response, Router } from 'express';

import UserController from './user.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import { filterSchema } from '@/validations/user.schema';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const userRouter: Router = express.Router();
// Define your routes

userRouter.get(
    '/',
    checkPermission(['users_list']),
    validationMiddleware(filterSchema),
    (req, res, next) => UserController.GetListUsers(req, res, next)
);

userRouter.get(
    '/:id',
    checkPermission(['users_view']),
    (req, res, next) => UserController.GetDetailUser(req, res, next)
);

userRouter.post(
    '/create',
    checkPermission(['users_create']),
    (req, res, next) => UserController.CreateUser(req, res, next)
);

userRouter.put(
    '/:id/edit',
    checkPermission(['users_edit']),
    (req, res, next) => UserController.UpdateUser(req, res, next)
);

userRouter.delete(
    '/:id/delete',
    checkPermission(['users_delete']),
    (req, res, next) => UserController.DeleteUser(req, res, next)
);

// Export the router
export default userRouter;