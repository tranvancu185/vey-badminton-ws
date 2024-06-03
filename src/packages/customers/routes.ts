import express, { Router, Request, Response } from 'express';
import { CustomerController } from './customer-controller';
import authenticateToken from '@/middlewares/auth-middleware';
// Create a new router instance
const customerRouter: Router = express.Router();
customerRouter.use(authenticateToken);
// Define your routes

customerRouter.get('/', async (req: Request, res: Response) => {
    const customerController = new CustomerController();
    await customerController.GetListCustomers(req, res);
});

customerRouter.get('/:id', async (req: Request, res: Response) => {
    const customerController = new CustomerController();
    await customerController.GetDetailCustomer(req, res);
});

customerRouter.post('/create', async (req: Request, res: Response) => {
    // Handle POST request for /users
    const customerController = new CustomerController();
    await customerController.CreateCustomer(req, res);
});

customerRouter.put('/:id/edit', async (req: Request, res: Response) => {
    // Handle PUT request for /users/:id
    const customerController = new CustomerController();
    await customerController.UpdateCustomer(req, res);
});

customerRouter.delete('/:id/delete', async (req: Request, res: Response) => {
    // Handle DELETE request for /users/:id
    const customerController = new CustomerController();
    await customerController.DeleteCustomer(req, res);
});

// Export the router
export default customerRouter;