import { Request, Response, NextFunction } from "express";
import { IUserFilterParams } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";
import UserService from "./user-services";
import usersMessage from "@/utils/message/users.message";
export class UserController extends BaseController {

    private service: UserService;
    constructor() {
        super();
        this.service = new UserService();
    }

    public async GetListUsers(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const params: IUserFilterParams = req.query;
            const dataUser = await this.service.getList(params);
            res.status(200).json({ ...usersMessage.GET_LIST_SUCCESS, status: 1, data: dataUser })
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
            res.status(200).json({ ...usersMessage.GET_USER_SUCCESS, status: 1, data: dataUser })
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
            res.status(200).json({ ...usersMessage.ADD_USER_SUCCESS, status: 1, data: dataUser })
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
            res.status(200).json({ ...usersMessage.EDIT_USER_SUCCESS, status: 1, data: dataUser })
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
            res.status(200).json({ ...usersMessage.DELETE_USER_SUCCESS, status: 1, data: result })
        } catch (error) {
            logger.error(`DELETE USER FAILED: ${error}`);
            next(error);
        }
    }

}

