import { Request, Response } from "express";
import { IGetListUsersRespone } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";

import createLogger from "@/configs/logger/logger";
import User from "@/models/user";

export class UserController extends BaseController<User> {

    public async GetListUsers(req: Request): Promise<IGetListUsersRespone> {
        const logger = createLogger({ fileName: 'get-list-users', infoLog: 'GET-LIST-USER', includeDate: true });
        const result: IGetListUsersRespone = {
            status: 1,
            message: 'Get list ussers successfully!',
            data: []
        };
        try {
            throw new Error('Error');
        } catch (error) {
            this.loggerDiscord({ level: 'error', message: 'GET LIST USERS FAILED', error: error as Error });
            logger.error(`GET LIST USERS FAILED: ${error}`);
            result.status = 0;
            result.message = 'Get list users failed!';
        }
        return result;
    }
}

