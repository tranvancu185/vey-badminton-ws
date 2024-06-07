import { Request } from "express";
import BaseController from "@/packages/commons/base-controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from "../users/user-services";
import { ILoginResponse } from "@/packages/auth/auth-interfaces";
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
            const user = await this.userService.getByCondition({ user_email, need_password: true, user_email_fix: true, includes: 'permission' });
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
                user_email: user.user_email,
                user_status: user.user_status,
                user_role_id: user.user_role_id,
                user_position_id: user.user_position_id,
                user_code: user.user_code,
                permission: user.user_permissions.map(p => p.permission_code),
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

    // Add a new method to handle refresh token requests
    public async RefreshToken(req: Request): Promise<ILoginResponse> {
        const logger = this.createLogger({ fileName: 'refresh-token', infoLog: 'REFRESH-TOKEN', includeDate: true });
        const result: ILoginResponse = {
            status: 0,
            message: 'Invalid refresh token!',
            data: null
        };

        try {
            const refreshToken = req.body.refreshToken;
            if (!refreshToken) {
                result.message = 'Refresh token is required.';
                return result;
            }

            try {
                // const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
                const user_id = req.auth?.user_id;
                // const user_id = decoded?.user_id;

                // Check if refresh token is valid for the user
                const user = await this.userService.getById(user_id);
                if (!user) {
                    result.message = 'Invalid refresh token.';
                    return result;
                }

                // Generate new JWT and refresh token
                const newTokenPayload = {
                    user_id: user.user_id,
                    user_name: user.user_name,
                    user_email: user.user_email
                };
                const newToken = jwt.sign(newTokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });
                const newRefreshToken = jwt.sign(newTokenPayload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

                // Update refresh token in database or storage (optional)
                // await this.userService.storeRefreshToken(user.user_id, newRefreshToken);

                result.status = 1;
                result.message = 'Refresh token success!';
                result.data = {
                    token: newToken,
                    refreshToken: newRefreshToken,
                    expiresIn: 3600,
                    user_id: user.user_id
                };
            } catch (error) {
                const err = error as Error;
                logger.error(JSON.stringify({ error: { name: err.name, message: err.message, stack: err.stack, }, params: req.body, description: 'Refresh token failed!' }));
                result.message = 'Invalid refresh token.';
            }
        } catch (error) {
            const err = error as Error;
            logger.error(JSON.stringify({ error: { name: err.name, message: err.message, stack: err.stack, }, params: req.body, description: 'Refresh token failed!' }));
            result.message = 'Internal server error!';
        }

        return result;
    }
}

