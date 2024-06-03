import { Request, Response } from "express";
import { IFilterParams } from "@/packages/customers/customer-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";
import CustomerService from "./customer-services";

export class CustomerController extends BaseController {

    private service: CustomerService;
    constructor() {
        super();
        this.service = new CustomerService();
    }

    public async GetListCustomers(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const params: IFilterParams = req.query;
            const dataCustomer = await this.service.getList(params);
            res.status(200).json({ status: 1, message: 'Get list Customers success!', data: dataCustomer })
        } catch (error) {
            logger.error(`GET LIST CustomerS FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async GetDetailCustomer(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const dataCustomer = await this.service.getById(id);
            res.status(200).json({ status: 1, message: 'Get Customer detail success!', data: dataCustomer })
        } catch (error) {
            logger.error(`GET Customer DETAIL FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async CreateCustomer(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const newCustomer = this.service.parseBody(req.body);
            const dataCustomer = await this.service.insert(newCustomer);
            res.status(200).json({ status: 1, message: 'Create Customer success!', data: dataCustomer })
        } catch (error) {
            logger.error(`CREATE Customer FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async UpdateCustomer(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const updatedCustomer = this.service.parseBody(req.body);
            const dataCustomer = await this.service.updateById(id, updatedCustomer);
            res.status(200).json({ status: 1, message: 'Update Customer success!', data: dataCustomer })
        } catch (error) {
            logger.error(`UPDATE Customer FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async DeleteCustomer(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const dataCustomer = await this.service.deleteById(id);
            res.status(200).json({ status: 1, message: 'Delete Customer success!', data: dataCustomer })
        } catch (error) {
            logger.error(`DELETE Customer FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

}

