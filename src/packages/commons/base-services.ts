// import { Op, where, fn, col, WhereOptions, FindOptions, InferAttributes } from 'sequelize';
// import User, { UserAttributes } from "@/databases/models/users";
// import IUser from "@/interfaces/IUser";

// export default class BaseService<T> {

//     protected model: T;

//     constructor(model: T) {
//         this.model = model;
//     }

//     public async getListUsers(params: any): Promise<IUser[]> {

//         const users = await this.model.findAll(condition);

//         return users;
//     }

//     public async getUserById(id: number): Promise<IUser | null> {
//         const user = await User.findByPk(id, { attributes: { exclude: ['user_password'] } });
//         return user;
//     }

//     public async getUserByCondition(params: any): Promise<IUser | null> {
//         const result = await T.findOne(condition);
//         return result;
//     }
// } 