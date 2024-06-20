import { NextFunction, Request, Response } from "express";
import { loginSchema, registerCustomerSchema } from "@/validations/auth.schema";

import BaseController from "@/packages/commons/base.controller";
import CustomerService from "../customers/customer.services";
import { ILoginResponse } from "@/packages/auth/auth.interfaces";
import UserService from "../users/user.services";
import authMessage from "../../utils/message/auth.message"
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import moment from "moment";

class AuthController extends BaseController {

    private userService: UserService;
    private customerService: CustomerService;

    constructor() {
        super();
        this.userService = new UserService();
        this.customerService = new CustomerService();
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

    // public LoginCustomer = async (req: Request, res: Response, next: NextFunction) => {

    // }

    public SignUpCustomer = async (req: Request, res: Response, next: NextFunction) => {
        const logger = this.createLogger({ fileName: 'shop-sign-up', infoLog: 'SIGN-UP', includeDate: true });
        const infoLog: {
            action: string[];
        } = {
            action: []
        }
        try {
            // 1. Lấy thông tin từ request
            const { customer_email, customer_password, customer_name, customer_phone } = registerCustomerSchema.parse(req.body);

            // 2. Kiểm tra email đã tồn tại chưa
            const customer = await this.customerService.getByCondition({
                customer_email,
                customer_email_fix: true,
                customer_phone_fix: true,
                customer_phone_or: true,
                customer_phone
            });
            if (customer) {
                infoLog.action.push(`Email or Phone existed: ${customer_email} - ${customer_phone}`);
                return next(this.appError({
                    ...authMessage.EMAIL_PHONE_EXISTED,
                    statusCode: 400
                }));
            }

            const passwordHash = await bcrypt.hash(customer_password, 10);
            const customer_code = crypto.randomBytes(16).toString('hex');
            // 3. Tạo mới khách hàng
            const newCustomer = await this.customerService.insert({
                customer_join_date: moment().unix(),
                customer_email,
                customer_password: passwordHash,
                customer_name,
                customer_phone,
                customer_status: 1,
                customer_code
            });

            if (newCustomer) {
                infoLog.action.push(`Create new customer: ${customer_email}`);
                logger.info(JSON.stringify(infoLog));
            }

            // 4. Trả về kết quả thành công
            res.status(200).json({ ...authMessage.SIGN_UP_SUCCESS, status: 1, data: newCustomer });
        } catch (error) {
            const err = error as Error;
            logger.error(JSON.stringify({ error: { name: err.name, message: err.message, stack: err.stack, }, params: req.body, description: 'Sign up failed!', infoLog }));
            next(error)
        }
    }
}

export default new AuthController();
