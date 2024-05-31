import { IBaseResponse } from '@/packages/commons/base-interfaces'

export interface ILoginRepsponseData {
    token: string;
    refreshToken: string;
    expiresIn: number;
    user_id: number; // Chỉ lấy user_id
}

export interface ILoginResponse extends IBaseResponse<ILoginRepsponseData> { }