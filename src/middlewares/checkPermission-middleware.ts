import { Request, Response, NextFunction } from 'express';
import AppError from '@/utils/appError';
import commonMessage from '@/utils/message/common.message';

const checkPermission = (requiredPermissions: string[]) => {
    return (req: Request, _: Response, next: NextFunction) => {
        try {
            if (!req.auth || !req.auth.role || !req.auth.role?.role_code) {
                throw new AppError(commonMessage.UNAUTHORIZED.message, 401, commonMessage.UNAUTHORIZED.message_code); // Hoặc chuyển hướng đến trang đăng nhập
            }
            const userRole: string | null = req.auth.role?.role_code || null;
            const userPermissions: string[] = req.auth?.permissions || [];

            if (userRole !== 'admin.role' && userRole !== 'superadmin.role') {
                if (!requiredPermissions.every(permission => userPermissions.includes(permission))) {
                    throw new AppError(commonMessage.FORBIDDEN.message, 403, commonMessage.FORBIDDEN.message_code);
                }
            }

            next(); // Cho phép truy cập nếu có đủ quyền
        } catch (err) {
            // Xử lý lỗi ở đây
            if (err instanceof AppError) {
                // Nếu là AppError, chuyển đến middleware xử lý lỗi chung
                next(err);
            } else {
                // Nếu không phải AppError, tạo AppError mới và chuyển đến middleware xử lý lỗi chung
                next(new AppError(commonMessage.INTERNAL_ERROR.message, 500, commonMessage.INTERNAL_ERROR.message_code));
            }
        }
    };
};

export default checkPermission;