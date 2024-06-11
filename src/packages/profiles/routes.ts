import express, { NextFunction, Request, Response, Router } from 'express';

import { ProfileController } from './profile-controller';
import checkPermission from '@/middlewares/checkPermission-middleware';
import validationMiddleware from '@/middlewares/validation-middleware';

// Create a new router instance
const profileRouter: Router = express.Router();
// Define your routes

profileRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const profileController = new ProfileController();
    await profileController.GetDetailUser(req, res, next);
});

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