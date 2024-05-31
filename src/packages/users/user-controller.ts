import { Request, Response } from "express";
import { IGetListUsersRespone } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";

import IUser from "@/interfaces/IUser";

export class UserController extends BaseController<IUser> {

    public async GetListUsers(req: Request): Promise<IGetListUsersRespone> {
        const logger = this.createLogger({ fileName: 'get-list-users', infoLog: 'GET-LIST-USER', includeDate: true });
        const result: IGetListUsersRespone = {
            status: 0,
            message: 'Get list users failed!',
            data: []
        };
        try {
            result.status = 1;
            result.message = 'Get list ussers successfully!';
        } catch (error) {
            // this.loggerDiscord({ level: 'error', message: 'GET LIST USERS FAILED', error: error as Error });
            logger.error(`GET LIST USERS FAILED: ${error}`);
            result.status = 0;
            result.message = `GET LIST USERS FAILED: ${error}`;
        }
        return result;
    }
}

