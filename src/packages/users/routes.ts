import express, { Router, Request, Response } from 'express';

// Create a new router instance
const userrouter: Router = express.Router();

// Define your routes
userrouter.get('/', (req: Request, res: Response) => {
    // Handle GET request for /users
    res.send('Get all users');
});

userrouter.get('/:id', (req: Request, res: Response) => {
    // Handle GET request for /users/:id
    const userId = req.params.id;
    res.send(`Get user with ID ${userId}`);
});

userrouter.post('/', (req: Request, res: Response) => {
    // Handle POST request for /users
    const newUser = req.body;
    res.send('Create a new user');
});

userrouter.put('/:id', (req: Request, res: Response) => {
    // Handle PUT request for /users/:id
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`Update user with ID ${userId}`);
});

userrouter.delete('/:id', (req: Request, res: Response) => {
    // Handle DELETE request for /users/:id
    const userId = req.params.id;
    res.send(`Delete user with ID ${userId}`);
});

// Export the router
export default userrouter;