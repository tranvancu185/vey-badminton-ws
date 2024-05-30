import { Get, Route } from "tsoa";
import { IGetListUsersRespone } from "@/packages/users/user-interfaces";

@Route("users")
export class UserController {
    @Get("/")
    public async getUsers( : ): Promise<IGetListUsersRespone> {
        // Your code here
        return true;
    }
}

