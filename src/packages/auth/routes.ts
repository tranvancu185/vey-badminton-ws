import express, { Router, Request, Response } from 'express';

// Create a new router instance
const authRouter: Router = express.Router();

authRouter.post('/login', (req: Request, res: Response) => {
    // Handle POST request for /users
    const newUser = req.body;
    res.send('Create a new user');
});

// Export the router
export default authRouter;