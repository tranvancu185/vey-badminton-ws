import express, { NextFunction, Request, Response, Router } from 'express';

import UserController from './user.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import { filterSchema } from '@/validations/user.schema';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const userRouter: Router = express.Router();
// Define your routes

userRouter.get('/', checkPermission(['users_list']), validationMiddleware(filterSchema), UserController.GetListUsers);

userRouter.get('/:id', checkPermission(['users_view']), UserController.GetDetailUser);

userRouter.post('/create', checkPermission(['users_create']), UserController.CreateUser);

userRouter.put('/:id/edit', checkPermission(['users_edit']), UserController.UpdateUser);

userRouter.delete('/:id/delete', checkPermission(['users_delete']), UserController.DeleteUser);

// Export the router
export default userRouter;