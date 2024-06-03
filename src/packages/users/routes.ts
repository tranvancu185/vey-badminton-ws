import express, { Router, Request, Response } from 'express';
import { UserController } from './user-controller';
import authenticateToken from '@/middlewares/auth-middleware';
// Create a new router instance
const userRouter: Router = express.Router();
userRouter.use(authenticateToken);
// Define your routes

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - API
 *       - User
 *     description: Returns all users
 */
userRouter.get('/', async (req: Request, res: Response) => {
    const userController = new UserController();
    const respone = await userController.GetListUsers(req);
    res.json(respone)
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - API
 *       - User
 *     description: Returns a single user
 */
userRouter.get('/:id', (req: Request, res: Response) => {
    // Handle GET request for /users/:id
    const userId = req.params.id;
    res.json({ id: userId });
});

userRouter.post('/create', (req: Request, res: Response) => {
    // Handle POST request for /users
    const newUser = req.body;
    res.send('Create a new user');
});

userRouter.put('/:id/edit', (req: Request, res: Response) => {
    // Handle PUT request for /users/:id
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`Update user with ID ${userId}`);
});

userRouter.delete('/:id/delete', (req: Request, res: Response) => {
    // Handle DELETE request for /users/:id
    const userId = req.params.id;
    res.send(`Delete user with ID ${userId}`);
});

// Export the router
export default userRouter;