import express, { NextFunction, Request, Response, Router } from 'express';

import ProfileController from './profile.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const profileRouter: Router = express.Router();
// Define your routes

profileRouter.get(
    '/',
    (req, res, next) => ProfileController.GetProfile(req, res, next)
);

profileRouter.get(
    '/:id', (req, res, next) => ProfileController.GetDetailUser(req, res, next)
);

profileRouter.put(
    '/:id/edit', (req, res, next) => ProfileController.UpdateUser(req, res, next)
);

// Export the router
export default profileRouter;