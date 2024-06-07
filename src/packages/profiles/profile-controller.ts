import { Request, Response, NextFunction } from "express";
import { IUserFilterParams } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";
import UserService from "@/packages/users/user-services";
import usersMessage from "@/utils/message/users.message";
export class ProfileController extends BaseController {

    private service: UserService;
    constructor() {
        super();
        this.service = new UserService();
    }

    public async GetDetailUser(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const user_id = req?.auth?.user_id;
            const dataUser = await this.service.getById(user_id);
            res.status(200).json({ ...usersMessage.GET_USER_SUCCESS, status: 1, data: dataUser })
        } catch (error) {
            logger.error(`GET USER DETAIL FAILED: ${error}`);
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

}

