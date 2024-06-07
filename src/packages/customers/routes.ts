import express, { Router, Request, Response, NextFunction } from 'express';
import { CustomerController } from './customer-controller';

// Create a new router instance
const customerRouter: Router = express.Router();
// Define your routes

customerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const customerController = new CustomerController();
    await customerController.GetListCustomers(req, res, next);
});

customerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const customerController = new CustomerController();
    await customerController.GetDetailCustomer(req, res, next);
});

customerRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    // Handle POST request for /users
    const customerController = new CustomerController();
    await customerController.CreateCustomer(req, res, next);
});

customerRouter.put('/:id/edit', async (req: Request, res: Response, next: NextFunction) => {
    // Handle PUT request for /users/:id
    const customerController = new CustomerController();
    await customerController.UpdateCustomer(req, res, next);
});

customerRouter.delete('/:id/delete', async (req: Request, res: Response, next: NextFunction) => {
    // Handle DELETE request for /users/:id
    const customerController = new CustomerController();
    await customerController.DeleteCustomer(req, res, next);
});

// Export the router
export default customerRouter;