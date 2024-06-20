// middleware/errorMiddleware.ts

import { NextFunction, Request, Response } from 'express';

import AppError from '@/utils/appError'; // Đường dẫn đến AppError.ts
import message from '@/utils/message/message';
import { z } from 'zod';

const errorMiddleware = (err: any, _: Request, res: Response, next: NextFunction) => {
    let error: AppError = err;
    if (err instanceof z.ZodError) {
        // Xử lý lỗi ZodError (validation)
        const allErrorMessages = err.issues.map(issue => issue.message);
        console.log(allErrorMessages);

        res.status(400).json({
            status: 400,
            message: allErrorMessages.map((e) => message[e] ? message[e].message : message.INTERNAL_ERROR.message),
            message_code: allErrorMessages.map((e) => message[e] ? message[e].message_code : message.INTERNAL_ERROR.message_code),
            ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}), // Chỉ hiển thị stack trace trong môi trường development
        });
    } else {
        if (!(err instanceof AppError)) {
            console.error(err); // Ghi log lỗi gốc để debug
            error = new AppError(message.INTERNAL_ERROR.message, 500, message.INTERNAL_ERROR.message_code); // Tạo AppError mới cho các lỗi không mong muốn
        }

        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
            message_code: error.message_code,
            ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}), // Chỉ hiển thị stack trace trong môi trường development
        });
    }
};

export default errorMiddleware;