import express, { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middlewares/validation-middleware';
import checkPermission from '@/middlewares/checkPermission-middleware';

import { ProfileController } from './profile-controller';
// Create a new router instance
const profileRouter: Router = express.Router();
// Define your routes

profileRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const profileController = new ProfileController();
    await profileController.GetDetailUser(req, res, next);
});

profileRouter.put('/:id/edit', async (req: Request, res: Response, next: NextFunction) => {
    const profileController = new ProfileController();
    await profileController.UpdateUser(req, res, next);
});

// Export the router
export default profileRouter;