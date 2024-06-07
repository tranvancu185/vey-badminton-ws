// middleware/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import AppError from '@/utils/appError'; // Đường dẫn đến AppError.ts
import commonMessage from '@/utils/message/common.message';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error: AppError = err;

    if (!(err instanceof AppError)) {
        console.error(err); // Ghi log lỗi gốc để debug
        error = new AppError(commonMessage.INTERNAL_ERROR.message, 500, commonMessage.INTERNAL_ERROR.message_code); // Tạo AppError mới cho các lỗi không mong muốn
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}), // Chỉ hiển thị stack trace trong môi trường development
    });
};

export default errorMiddleware;