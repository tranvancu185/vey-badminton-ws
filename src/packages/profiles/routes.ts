import express, { NextFunction, Request, Response, Router } from 'express';

import ProfileController from './profile.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const profileRouter: Router = express.Router();
// Define your routes

profileRouter.get('/', ProfileController.GetProfile);

profileRouter.get('/:id', ProfileController.GetDetailUser);

profileRouter.put('/:id/edit', ProfileController.UpdateUser);

// Export the router
export default profileRouter;