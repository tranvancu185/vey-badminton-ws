import express, { NextFunction, Request, Response, Router } from 'express';

import CustomerController from './customer.controller';
import checkPermission from '@/middlewares/check-permission.middleware';

// Create a new router instance
const customerRouter: Router = express.Router();
// Define your routes

customerRouter.get('/', checkPermission(['customers_list']), CustomerController.GetListCustomers);

customerRouter.get('/:id', checkPermission(['customers_view']), CustomerController.GetDetailCustomer);

customerRouter.post('/create', checkPermission(['customers_create']), CustomerController.CreateCustomer);

customerRouter.put('/:id/edit', checkPermission(['customers_edit']), CustomerController.UpdateCustomer);

customerRouter.delete('/:id/delete', checkPermission(['customers_delete']), CustomerController.DeleteCustomer);

// Export the router
export default customerRouter;