import { Request } from "express";
import { IGetListUsersRespone, IUserFilterParams } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
// import { Get, Tags } from "tsoa";
import UserService from "./user-services";

export class UserController extends BaseController {

    private service: UserService;
    constructor() {
        super();
        this.service = new UserService();
    }

    public async GetListUsers(req: Request): Promise<IGetListUsersRespone> {
        const logger = this.createLogger({ fileName: 'get-list-users', infoLog: 'GET-LIST-USER', includeDate: true });
        const result: IGetListUsersRespone = {
            status: 0,
            message: 'Get list users failed!',
            data: []
        };
        try {
            const params: IUserFilterParams = req.query;
            const dataUser = await this.service.getList(params);
            console.log(req.auth)
            result.data = dataUser ?? [];
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

