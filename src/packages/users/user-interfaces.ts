import { IBaseResponse } from '@/packages/commons/interfaces'
import User from '@/models/user'

export interface IGetListUsersRespone extends IBaseResponse<User[]> { }