import express, { Router, Request, Response } from 'express';
import { UserController } from './user-controller';

// Create a new router instance
const userRouter: Router = express.Router();
const userController = new UserController();

// Define your routes
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/User'
 *       500:
 *         description: Some server error
 *
 */
userRouter.get('/', async (req: Request, res: Response) => {
    const respone = await userController.GetListUsers(req);
    res.json(respone)
});

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