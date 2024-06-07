import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const validationMiddleware = (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ errors: error.format() });
        } else {
            next(error); // Pass other errors to the error handler
        }
    }
};

export default validationMiddleware;