import express, { Router } from 'express';

import AuthController from './auth.controller';

// Create a new router instance
const authRouter: Router = express.Router();

authRouter.post('/login', AuthController.Login);

authRouter.get('/logout', AuthController.Logout)

// Export the router
export default authRouter;