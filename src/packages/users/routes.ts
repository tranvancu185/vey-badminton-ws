import express, { Router, Request, Response } from 'express';
import { UserController } from './user-controller';
import authenticateToken from '@/middlewares/auth-middleware';
// Create a new router instance
const userRouter: Router = express.Router();
userRouter.use(authenticateToken);
// Define your routes

/**
 * @swagger
 * /:
 *   get:
 *     description: Get a list of users
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.get('/', async (req: Request, res: Response) => {
    const userController = new UserController();
    const respone = await userController.GetListUsers(req);
    res.json(respone)
});

/**
 * @swagger
 * /:id:
 *   get:
 *     description: Get a user by ID
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.get('/:id', (req: Request, res: Response) => {
    // Handle GET request for /users/:id
    const userId = req.params.id;
    res.json({ id: userId });
});

/**
 * @swagger
 * /create:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.post('/create', (req: Request, res: Response) => {
    // Handle POST request for /users
    const newUser = req.body;
    res.send('Create a new user');
});

/**
 * @swagger
 * /:id/edit:
 *   put:
 *     description: Update a user by ID
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.put('/:id/edit', (req: Request, res: Response) => {
    // Handle PUT request for /users/:id
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`Update user with ID ${userId}`);
});

/**
 * @swagger
 * /:id/delete:
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 */
userRouter.delete('/:id/delete', (req: Request, res: Response) => {
    // Handle DELETE request for /users/:id
    const userId = req.params.id;
    res.send(`Delete user with ID ${userId}`);
});

// Export the router
export default userRouter;