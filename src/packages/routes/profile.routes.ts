import express, { NextFunction, Request, Response, Router } from 'express';

import ProfileController from '@/packages/controllers/profile.controller';
import checkPermission from '@/middlewares/check-permission.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';

// Create a new router instance
const profileRouter: Router = express.Router();
// Define your routes

profileRouter.get(
    '/',
    (req: Request, res: Response, next: NextFunction) => ProfileController.GetProfile(req, res, next)
);

profileRouter.get(
    '/:id',
    (req: Request, res: Response, next: NextFunction) => ProfileController.GetDetailUser(req, res, next)
);

profileRouter.put(
    '/:id/edit',
    (req: Request, res: Response, next: NextFunction) => ProfileController.UpdateUser(req, res, next)
);

// Export the router
export default profileRouter;