import { IBaseResponse } from '@/packages/commons/base-interfaces'
import User from '@/models/user'

export interface IGetListUsersRespone extends IBaseResponse<User[]> { }