import { NextFunction, Request, Response } from 'express';
import { ZodError, z } from 'zod';

import AppError from '@/utils/appError';
import message from '@/utils/message/message';

const validationMiddleware = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (schema !== undefined && schema !== null) {
            if (req.body) {
                schema.parse(req.body);
            } else if (req.query) {
                schema.parse(req.query);
            } else if (req.params) {
                schema.parse(req.params);
            }
        }
        next();
    } catch (error) {
        next(error); // Pass other errors to the error handler
    }
};

export default validationMiddleware;