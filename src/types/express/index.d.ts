// src/types/express/index.d.ts
import { Request } from "express";
declare module 'express' {  // Thêm dòng này
    namespace Express {
        interface Request extends Request {
            auth?: IUser; // Hoặc bất kỳ kiểu dữ liệu nào bạn đã định nghĩa cho user
        }
    }
}