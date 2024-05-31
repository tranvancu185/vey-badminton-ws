import { IBaseResponse } from '@/packages/commons/base-interfaces'
import User from '@/interfaces/IUser'

export interface IGetListUsersRespone extends IBaseResponse<User[]> { }