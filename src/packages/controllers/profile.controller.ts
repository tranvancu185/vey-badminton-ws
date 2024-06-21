import { NextFunction, Request, Response } from "express";

import BaseController from "@/packages/commons/base.controller";
import UserService from "@/packages/services/user.services";
import message from "@/utils/message/message";

// import { Get, Tags } from "tsoa";

class ProfileController extends BaseController {
    private static instance: ProfileController;
    private service: UserService;
    constructor() {
        super();
        this.service = new UserService();
    }

    public static getInstance() {
        if (!ProfileController.instance) {
            ProfileController.instance = new ProfileController();
        }
        return ProfileController.instance;
    }

    public async GetProfile(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            console.log('---------------------------------')
            const profile = req.auth ?? null;
            if (profile == null) {
                next(this.appError({ message: 'User not found!', message_code: 'USER_NOT_FOUND', statusCode: 404 }));
            }
            const ip = req.ip;
            res.status(200).json({
                ...message.GET_USER_SUCCESS, status: 1, data: {
                    ...profile,
                    ip
                }
            })
        } catch (error) {
            logger.error(`GET USER FAILED: ${error}`);
            next(error);
        }
    }

    public async GetDetailUser(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({});
        try {
            const user_id = req?.auth?.user_id;
            const dataUser = await this.service.getById(user_id);
            res.status(200).json({ ...message.GET_USER_SUCCESS, status: 1, data: dataUser })
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
            res.status(200).json({ ...message.EDIT_USER_SUCCESS, status: 1, data: dataUser })
        } catch (error) {
            logger.error(`UPDATE USER FAILED: ${error}`);
            next(error);
        }
    }

}

export default ProfileController.getInstance();
