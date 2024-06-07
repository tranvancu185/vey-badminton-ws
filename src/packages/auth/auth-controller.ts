import { Request, Response, NextFunction } from "express";
import BaseController from "@/packages/commons/base-controller";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserService from "../users/user-services";
import { ILoginResponse } from "@/packages/auth/auth-interfaces";
import { loginSchema } from "@/validations/auth.schema";
import authMessage from "../../utils/message/auth.message"
export class AuthController extends BaseController {

    private userService: UserService;
    constructor() {
        super();
        this.userService = new UserService();
    }

    public async Login(req: Request, res: Response, next: NextFunction) {
        const logger = this.createLogger({ fileName: 'login', infoLog: 'LOG-IN', includeDate: true });
        try {
            const { user_email, user_password } = loginSchema.parse(req.body);

            // 2. Tìm người dùng
            const user = await this.userService.getByCondition({
                user_email,
                need_password: true,
                user_email_fix: true,
                include: 'permission'
            });
            if (!user) {
                return next(this.appError({
                    ...authMessage.INVALID_LOGIN,
                    statusCode: 401
                }));
            }

            // 3. Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
            if (!isPasswordValid) {
                return next(this.appError({
                    ...authMessage.INVALID_LOGIN,
                    statusCode: 401
                }));
            }

            // 4. Tạo JWT
            const tokenPayload = {
                user_id: user?.user_id,
                user_name: user?.user_name,
                user_email: user?.user_email,
                user_status: user?.user_status,
                user_role_id: user?.user_role_id,
                user_position_id: user?.user_position_id,
                user_code: user?.user_code,
                permissions: user?.permissions.map(p => p.permission_code),
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, { expiresIn: '1h' });

            // 5. Trả về kết quả thành công
            const dataRespone: ILoginResponse = {
                ...authMessage.LOGIN_SUCCESS,
                status: 1,
                data: {
                    token,
                    refreshToken: "", // Hoặc tạo và thêm refresh token ở đây
                    expiresIn: 3600,
                    user_id: user?.user_id
                }
            };

            res.status(200).json(dataRespone)
        } catch (error) {
            const err = error as Error;
            logger.error(JSON.stringify({ error: { name: err.name, message: err.message, stack: err.stack, }, params: req.body, description: 'Login failed!' }));
            next(error)
        }
    }

    public async Logout(res: Response) {
        // Xóa token JWT khỏi cookie
        res.clearCookie(this.CONSTANTS.COOKIE_KEY.TOKEN, { httpOnly: true, secure: true }); // Điều chỉnh các tùy chọn cookie nếu cần

        // (Tùy chọn) Xóa refresh token nếu bạn sử dụng
        // res.clearCookie('refreshToken', { httpOnly: true, secure: true });

        // Trả về response thành công
        res.sendStatus(200).json(authMessage.LOGOUT_SUCCESS); // Hoặc res.json({ message: 'Logout successful' });
    }

}

