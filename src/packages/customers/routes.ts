import express, { NextFunction, Request, Response, Router } from 'express';

import CustomerController from './customer.controller';
import checkPermission from '@/middlewares/check-permission.middleware';

// Create a new router instance
const customerRouter: Router = express.Router();
// Define your routes

customerRouter.get(
    '/',
    checkPermission(['customers_list']),
    (req, res, next) => CustomerController.GetListCustomers(req, res, next)
);

customerRouter.get(
    '/:id',
    checkPermission(['customers_view']),
    (req, res, next) => CustomerController.GetDetailCustomer(req, res, next)
);

customerRouter.post(
    '/create',
    checkPermission(['customers_create']),
    (req, res, next) => CustomerController.CreateCustomer(req, res, next)
);

customerRouter.put(
    '/:id/edit',
    checkPermission(['customers_edit']),
    (req, res, next) => CustomerController.UpdateCustomer(req, res, next)
);

customerRouter.delete(
    '/:id/delete',
    checkPermission(['customers_delete']),
    (req, res, next) => CustomerController.DeleteCustomer(req, res, next)
);

// Export the router
export default customerRouter;