import { Request } from "express";
import BaseController from "@/packages/commons/base-controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from "../users/user-services";
import { ILoginResponse } from "@/packages/auth/auth-interfaces";
import IUser from "@/interfaces/IUser";

export class AuthController extends BaseController {

    private userService: UserService;
    constructor() {
        super();
        this.userService = new UserService();
    }

    public async Login(req: Request): Promise<ILoginResponse> {
        const logger = this.createLogger({ fileName: 'login', infoLog: 'LOG-IN', includeDate: true });
        const result: ILoginResponse = {
            status: 0,
            message: 'Username or password incorrect!',
            data: null
        };

        try {
            const { user_email, user_password } = req.body;
            // 1. Kiểm tra đầu vào
            if (!user_email || !user_password) {
                result.message = 'Username and password are required.';
                return result;
            }
            // 2. Tìm người dùng
            const user = await this.userService.getByCondition({ user_email, need_password: true, user_email_fix: true });
            if (!user) {
                return result;
            }

            // 3. Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
            if (!isPasswordValid) {
                return result;
            }

            // 4. Tạo JWT
            const tokenPayload = {
                user_id: user.user_id,
                user_name: user.user_name,
                user_email: user.user_email
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });

            // 5. Trả về kết quả thành công
            result.status = 1;
            result.message = 'Login successfully!';
            result.data = {
                token,
                refreshToken: "", // Hoặc tạo và thêm refresh token ở đây
                expiresIn: 3600,
                user_id: user.user_id
            };
        } catch (error) {
            const err = error as Error;
            logger.error(JSON.stringify({ error: { name: err.name, message: err.message, stack: err.stack, }, params: req.body, description: 'Login failed!' }));
            result.status = 0;
            result.message = 'Internal server error!'; // Tránh trả về lỗi chi tiết cho người dùng
            result.data = null;
        }

        return result;
    }
}

