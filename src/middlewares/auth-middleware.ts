import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import commonMessage from '@/utils/message/common.message';
import UserService from '@/packages/users/user-services';
import CONSTANTS from '@/utils/constants';
import AppError from '@/utils/appError';

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)
        const token = authHeader?.split(' ')[1]; // Optional chaining

        if (!token) {
            return next(new AppError(commonMessage.UNAUTHORIZED.message, 401, commonMessage.UNAUTHORIZED.message_code));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { user_id: number };

        if (!decodedToken || !decodedToken.user_id) {
            return next(new AppError(commonMessage.TOKEN_INVALID.message, 403, commonMessage.TOKEN_INVALID.message_code));
        }

        const userDetail = await new UserService().getByCondition({
            user_id: decodedToken.user_id,
            include: [CONSTANTS.KEY_INCLUDE_USER.PERMISSION, CONSTANTS.KEY_INCLUDE_USER.ROLE]
        });
        console.log(userDetail);
        if (!userDetail) {
            return next(new AppError(commonMessage.NOT_FOUND.message, 404, commonMessage.NOT_FOUND.message_code));
        }

        req.auth = userDetail;

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