import { Request, Response } from 'express';

export interface IBaseResponse<T> {
    status: number;
    message: string;
    data: T;
}

export interface IProperty {
    req: Request;
    res: Response;
}