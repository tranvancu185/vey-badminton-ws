import { Request, Response } from "express";
import { IUserFilterParams } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";
import UserService from "./user-services";

export class UserController extends BaseController {

    private service: UserService;
    constructor() {
        super();
        this.service = new UserService();
    }

    public async GetListUsers(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const params: IUserFilterParams = req.query;
            const dataUser = await this.service.getList(params);
            res.status(200).json({ status: 1, message: 'Get list users success!', data: dataUser })
        } catch (error) {
            logger.error(`GET LIST USERS FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async GetDetailUser(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const dataUser = await this.service.getById(id);
            res.status(200).json({ status: 1, message: 'Get user detail success!', data: dataUser })
        } catch (error) {
            logger.error(`GET USER DETAIL FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async CreateUser(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const newUser = this.service.parseBody(req.body);
            const dataUser = await this.service.insert(newUser);
            res.status(200).json({ status: 1, message: 'Create user success!', data: dataUser })
        } catch (error) {
            logger.error(`CREATE USER FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async UpdateUser(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const updatedUser = this.service.parseBody(req.body);
            const dataUser = await this.service.updateById(id, updatedUser);
            res.status(200).json({ status: 1, message: 'Update user success!', data: dataUser })
        } catch (error) {
            logger.error(`UPDATE USER FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

    public async DeleteUser(req: Request, res: Response) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const result = await this.service.deleteById(id);
            res.status(200).json({ status: 1, message: 'Delete user success!', data: result })
        } catch (error) {
            logger.error(`DELETE USER FAILED: ${error}`);
            res.status(500).json({ status: 0, message: 'Internal Server Error!' });
        }
    }

}

