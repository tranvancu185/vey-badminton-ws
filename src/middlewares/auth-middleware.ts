import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import commonMessage from '@/utils/message/common.message';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ ...commonMessage.UNAUTHORIZED });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ ...commonMessage.TOKEN_EXPIRED }); // Trả về lỗi hết hạn
            }
            return res.status(403).json({ ...commonMessage.FORBIDDEN });
        }
        req.auth = user;
        next();
    });
};

export default authenticateToken;