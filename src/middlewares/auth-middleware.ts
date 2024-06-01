import { Request, Response, NextFunction } from 'express';
// import '@/types';
import jwt from 'jsonwebtoken';
import IUser from '@/interfaces/IUser';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' }); // Trả về lỗi hết hạn
            }
            return res.status(403).json({ error: 'Unauthorized' });
        }
        // console.log(user as IUser)
        // req.auth = user as IUser;
        next();
    });
};

export default authenticateToken;