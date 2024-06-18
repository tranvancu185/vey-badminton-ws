import { NextFunction, Request, Response } from 'express';

import AppError from '@/utils/appError';
import CONSTANTS from '@/utils/constants';
import UserService from '@/packages/users/user.services';
import commonMessage from '@/utils/message/common.message';
import jwt from 'jsonwebtoken';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(' ')[1]; // Optional chaining

        if (!token) {
            return next(new AppError(commonMessage.UNAUTHORIZED.message, 401, commonMessage.UNAUTHORIZED.message_code));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: number };

        if (!decodedToken || !decodedToken.user_id) {
            return next(new AppError(commonMessage.TOKEN_INVALID.message, 403, commonMessage.TOKEN_INVALID.message_code));
        }

        const userService = new UserService();
        const userDetail = await userService.getByCondition({
            user_id: decodedToken.user_id,
            include: [CONSTANTS.KEY_INCLUDE_USER.PERMISSION, CONSTANTS.KEY_INCLUDE_USER.ROLE]
        });

        if (!userDetail) {
            return next(new AppError(commonMessage.NOT_FOUND.message, 404, commonMessage.NOT_FOUND.message_code));
        }
        const permissions = userDetail?.permissions?.map(permission => permission.permission_code);
        const role = userDetail?.role;

        req.auth = {
            profile: {
                user_id: userDetail.user_id,
                user_name: userDetail.user_name,
                user_email: userDetail.user_email,
                user_phone: userDetail.user_phone,
                user_config: userDetail.user_config,
                user_properties: userDetail.user_properties,
                user_full_address: userDetail.user_full_address,
                user_detail_address: userDetail.user_detail_address,
                user_provice_id: userDetail.user_provice_id,
                user_district_id: userDetail.user_district_id,
                user_ward_id: userDetail.user_ward_id,
                user_code: userDetail.user_code,
                user_status: userDetail.user_status,
                user_birthday: userDetail.user_birthday,
                user_description: userDetail.user_description,
                user_department_id: userDetail.user_department_id,
                user_position_id: userDetail.user_position_id,
                user_create_by: userDetail.user_create_by,
                user_join_date: userDetail.user_join_date,
                user_deleted_at: userDetail.user_deleted_at,
                user_created_at: userDetail.user_created_at,
                user_updated_at: userDetail.user_updated_at,
            },
            permissions: permissions,
            role: role
        };

        next(); // Cho phép truy cập vào route tiếp theo
    } catch (err: any) {
        // Xử lý lỗi hết hạn token
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ ...commonMessage.TOKEN_EXPIRED });
        }
        next(err);
    }
};

export default authenticateToken;