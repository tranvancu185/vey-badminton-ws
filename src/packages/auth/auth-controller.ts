import { Request, Response } from "express";
import { IGetListUsersRespone } from "@/packages/users/user-interfaces";
import BaseController from "@/packages/commons/base-controller";
import { Get, Tags } from "tsoa";


@Tags("users")
export class UserController extends BaseController {
    @Get("/")
    public async getUsers(req: Request, res: Response): Promise<IGetListUsersRespone> {
        // Your code here
        return {
            status: 1,
            message: '',
            data: []
        };
    }
}

