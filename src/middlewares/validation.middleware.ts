import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

const validationMiddleware = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        if (schema !== undefined && schema !== null) {
            if (req.body) {
                schema.parse(req.body);
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