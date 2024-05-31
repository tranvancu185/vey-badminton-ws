// import { Op, where, fn, col, WhereOptions, FindOptions, InferAttributes } from 'sequelize';
import { Op, FindOptions, InferAttributes } from 'sequelize';
// import BaseService from "@/packages/commons/base-services";
import User, { UserAttributes } from "@/databases/models/users";
import IUser from "@/interfaces/IUser";

export default class UserService {

    public async getListUsers(params: any): Promise<IUser[]> {
        const condition = this.parseFilter(params);
        const users = await User.findAll(condition);
        return users;
    }

    public async getUserById(id: number): Promise<IUser | null> {
        const user = await User.findByPk(id, { attributes: { exclude: ['user_password'] } });
        return user;
    }

    public async getUserByCondition(params: any): Promise<IUser | null> {
        const condition = this.parseFilter(params);
        const user = await User.findOne(condition);
        return user;
    }

    protected parseFilter(params: any): FindOptions<InferAttributes<User>> {

        let orQuery = [];
        let andQuery = [];

        if (params.user_name !== undefined) {
            // Nếu user_name_fix = true thì tìm chính xác, ngược lại tìm theo like
            params.user_name_fix ?
                andQuery.push({ user_name: params.user_name })
                :
                orQuery.push({ user_name: { [Op.like]: `%${params.user_name}%` } });
        }

        if (params.user_email !== undefined) {
            // Nếu user_email_fix = true thì tìm chính xác, ngược lại tìm theo like
            params.user_email_fix ?
                andQuery.push({ user_email: params.user_email })
                :
                orQuery.push({ user_email: { [Op.like]: `%${params.user_email}%` } });
        }

        if (params.user_phone !== undefined) {
            // Nếu user_phone_fix = true thì tìm chính xác, ngược lại tìm theo like
            params.user_phone_fix ?
                andQuery.push({ user_phone: params.user_phone })
                :
                orQuery.push({ user_phone: { [Op.like]: `%${params.user_phone}%` } });
        }

        if (params.user_status !== undefined) {
            andQuery.push({ user_status: params.user_status });
        }

        if (params.user_role_id !== undefined) {
            Array.isArray(params.user_role_id) ?
                andQuery.push({ user_role: { [Op.in]: params.user_role_id } })
                :
                andQuery.push({ user_role: params.user_role_id });
        }

        if (params.user_department_id !== undefined) {
            Array.isArray(params.user_department_id) ?
                andQuery.push({ user_department: { [Op.in]: params.user_department_id } })
                :
                andQuery.push({ user_department: params.user_department_id });
        }

        if (params.user_position_id !== undefined) {
            Array.isArray(params.user_position_id) ?
                andQuery.push({ user_position_id: { [Op.in]: params.user_position_id } })
                :
                andQuery.push({ user_position_id: params.user_position_id });
        }

        if (params.user_provice_id !== undefined) {
            andQuery.push({ user_provice_id: params.user_provice_id });
        }

        if (params.user_district_id !== undefined) {
            andQuery.push({ user_district_id: params.user_district_id });
        }

        if (params.user_ward_id !== undefined) {
            andQuery.push({ user_ward_id: params.user_ward_id });
        }

        if (params.user_code !== undefined) {
            andQuery.push({ user_code: params.user_code });
        }

        if (params.user_config !== undefined) {
            andQuery.push({ user_config: params.user_config });
        }

        if (params.user_create_by !== undefined) {
            andQuery.push({ user_create_by: params.user_create_by });
        }

        if (params.create_from_date !== undefined && params.create_to_date !== undefined) {
            andQuery.push({
                user_created_at: {
                    [Op.between]: [params.create_from_date, params.create_to_date]
                }
            });
        }

        if (params.join_from_date !== undefined && params.join_to_date !== undefined) {
            andQuery.push({
                user_join_date: {
                    [Op.between]: [params.join_from_date, params.join_to_date]
                }
            });
        }

        if (params.delete_from_date !== undefined && params.delete_to_date !== undefined) {
            andQuery.push({
                user_deleted_at: {
                    [Op.between]: [params.delete_from_date, params.delete_to_date]
                }
            });
        }

        if (params.user_code !== undefined) {
            andQuery.push({ user_code: params.user_code });
        }

        const whereQuery: any = {};

        if (orQuery.length !== 0) {
            whereQuery[Op.or] = orQuery;
        }
        if (andQuery.length !== 0) {
            whereQuery[Op.and] = andQuery;
        }
        console.log(params)
        // option attributes
        let attributes: any | null = null;
        if (params.exclude !== undefined) {
            if (Array.isArray(params.exclude)) {
                attributes.exclude = params.exclude
            } else {
                attributes.exclude = [params.exclude];
            }
        }

        // TODO: option includes
        let includes: any | null = null;
        if (params.include !== undefined && params.include !== null) {
            Array.isArray(params.include) ?
                includes = params.include
                :
                includes = [params.include];
        }

        // Tạo điều kiện tìm kiếm
        const condition: FindOptions<InferAttributes<User>> = {
            where: whereQuery
        };
        // Thêm các option nếu có
        if (attributes) {
            if (params.need_password !== undefined) {
                attributes.exclude = attributes.exclude.filter((item: string) => item !== 'user_password');
            } else {
                if (attributes.exclude.indexOf('user_password') === -1) {
                    attributes.exclude.push('user_password');
                }
            }
            condition.attributes = attributes;
        }
        if (includes) {
            condition.include = includes;
        }
        // Thêm điều kiện order
        if (params.order !== undefined) {
            condition.order = params.order;
        } else {
            condition.order = [['user_id', 'ASC']];
        }
        if (params.page !== undefined) {
            params.offset = (params.page - 1) * params.limit;
        }
        if (params.offset !== undefined) {
            condition.offset = params.offset;
        } else {
            condition.offset = 0;
        }
        if (params.limit !== undefined) {
            condition.limit = params.limit;
        } else {
            condition.limit = 10;
        }
        return condition;
    }
} 