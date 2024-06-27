import { NextFunction, Request, Response } from "express";

import BaseController from "@/packages/commons/base.controller";
import CustomerService from "@/packages/services/customer.service";
import { IFilterParams } from "@/packages/interfaces/customer.interface";
import message from "@/utils/message/message";

// import { Get, Tags } from "tsoa";



class CustomerController extends BaseController {
    private static instance: CustomerController;

    private service: CustomerService;
    constructor() {
        super();
        this.service = new CustomerService();
    }

    public static getInstance() {
        if (!CustomerController.instance) {
            CustomerController.instance = new CustomerController();
        }
        return CustomerController.instance;
    }

    public async GetListCustomers(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const params: IFilterParams = req.query;
            const dataCustomer = await this.service.getList(params);
            res.status(200).json({ ...message.GET_LIST_SUCCESS, status: 1, data: dataCustomer })
        } catch (error) {
            logger.error(`GET LIST CustomerS FAILED: ${error}`);
            next(error);
        }
    }

    public async GetDetailCustomer(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const dataCustomer = await this.service.getById(id);
            res.status(200).json({ ...message.GET_CUSTOMER_SUCCESS, status: 1, data: dataCustomer })
        } catch (error) {
            logger.error(`GET Customer DETAIL FAILED: ${error}`);
            next(error);
        }
    }

    public async CreateCustomer(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const newCustomer = this.service.parseBody(req.body);
            const dataCustomer = await this.service.insert(newCustomer);
            res.status(200).json({ ...message.ADD_CUSTOMER_SUCCESS, status: 1, data: dataCustomer })
        } catch (error) {
            logger.error(`CREATE Customer FAILED: ${error}`);
            next(error);
        }
    }

    public async UpdateCustomer(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const updatedCustomer = this.service.parseBody(req.body);
            const dataCustomer = await this.service.updateById(id, updatedCustomer);
            res.status(200).json({ ...message.EDIT_CUSTOMER_SUCCESS, status: 1, data: dataCustomer })
        } catch (error) {
            logger.error(`UPDATE Customer FAILED: ${error}`);
            next(error);
        }
    }

    public async DeleteCustomer(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const dataCustomer = await this.service.deleteById(id);
            res.status(200).json({ ...message.DELETE_CUSTOMER_SUCCESS, status: 1, data: dataCustomer })
        } catch (error) {
            logger.error(`DELETE Customer FAILED: ${error}`);
            next(error);
        }
    }

}

export default CustomerController.getInstance();

