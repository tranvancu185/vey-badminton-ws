import { NextFunction, Request, Response } from "express";

import BaseController from "@/packages/commons/base.controller";
import { IUserFilterParams } from "@/packages/interfaces/user.interfaces";
import UserService from "@/packages/services/user.services";
import message from "@/utils/message/message";

// import { Get, Tags } from "tsoa";


class UserController extends BaseController {
    private static instance: UserController;
    private service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    public static getInstance() {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    public async GetListUsers(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const params: IUserFilterParams = req.query;
            const dataUser = await this.service.getList(params);
            res.status(200).json({ ...message.GET_LIST_SUCCESS, status: 1, data: dataUser })
        } catch (error) {
            logger.error(`GET LIST USERS FAILED: ${error}`);
            next(error);
        }
    }

    public async GetDetailUser(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const dataUser = await this.service.getById(id);
            res.status(200).json({ ...message.GET_USER_SUCCESS, status: 1, data: dataUser })
        } catch (error) {
            logger.error(`GET USER DETAIL FAILED: ${error}`);
            next(error);
        }
    }

    public async CreateUser(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const newUser = this.service.parseBody(req.body);
            const dataUser = await this.service.insert(newUser);
            res.status(200).json({ ...message.ADD_USER_SUCCESS, status: 1, data: dataUser })
        } catch (error) {
            logger.error(`CREATE USER FAILED: ${error}`);
            next(error);
        }
    }

    public async UpdateUser(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const updatedUser = this.service.parseBody(req.body);
            const dataUser = await this.service.updateById(id, updatedUser);
            res.status(200).json({ ...message.EDIT_USER_SUCCESS, status: 1, data: dataUser })
        } catch (error) {
            logger.error(`UPDATE USER FAILED: ${error}`);
            next(error);
        }
    }

    public async DeleteUser(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const id = req.params.id;
            const result = await this.service.deleteById(id);
            res.status(200).json({ ...message.DELETE_USER_SUCCESS, status: 1, data: result })
        } catch (error) {
            logger.error(`DELETE USER FAILED: ${error}`);
            next(error);
        }
    }

}

export default UserController.getInstance();