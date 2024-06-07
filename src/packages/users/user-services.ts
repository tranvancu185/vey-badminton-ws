import { Op, FindOptions, InferAttributes } from 'sequelize';

import User from "@/databases/models/users.model";
import Permission from '@/databases/models/permissions.model';
import Role from '@/databases/models/roles.model';

import { IUserFilterParams } from './user-interfaces';
import BaseService from '../commons/base-services';
import IUser from './user-interfaces';
import CONSTANTS from "@/utils/constants"
export default class UserService extends BaseService<User> {

    constructor() {
        super(User);
    }

    public parseBody(body: any): IUser {
        const bodyParser: any = {};
        if (body.user_id !== undefined) {
            bodyParser.user_id = body.user_id;
        }
        if (body.user_name !== undefined) {
            bodyParser.user_name = body.user_name;
        }
        if (body.user_email !== undefined) {
            bodyParser.user_email = body.user_email;
        }
        if (body.user_avatar !== undefined) {
            bodyParser.user_avatar = body.user_avatar;
        }
        if (body.user_phone !== undefined) {
            bodyParser.user_phone = body.user_phone;
        }
        if (body.user_full_address !== undefined) {
            bodyParser.user_full_address = body.user_full_address;
        }
        if (body.user_detail_address !== undefined) {
            bodyParser.user_detail_address = body.user_detail_address;
        }
        if (body.user_provice_id !== undefined) {
            bodyParser.user_provice_id = body.user_provice_id;
        }
        if (body.user_district_id !== undefined) {
            bodyParser.user_district_id = body.user_district_id;
        }
        if (body.user_ward_id !== undefined) {
            bodyParser.user_ward_id = body.user_ward_id;
        }
        if (body.user_code !== undefined) {
            bodyParser.user_code = body.user_code;
        }
        if (body.user_status !== undefined) {
            bodyParser.user_status = body.user_status;
        }
        if (body.user_birthday !== undefined) {
            bodyParser.user_birthday = body.user_birthday;
        }
        if (body.user_description !== undefined) {
            bodyParser.user_description = body.user_description;
        }
        if (body.user_properties !== undefined) {
            bodyParser.user_properties = body.user_properties;
        }
        if (body.user_config !== undefined) {
            bodyParser.user_config = body.user_config;
        }
        if (body.user_password !== undefined) {
            bodyParser.user_password = body.user_password;
        }
        if (body.user_role_id !== undefined) {
            bodyParser.user_role_id = body.user_role_id;
        }
        if (body.user_department_id !== undefined) {
            bodyParser.user_department_id = body.user_department_id;
        }
        if (body.user_position_id !== undefined) {
            bodyParser.user_position_id = body.user_position_id;
        }
        if (body.user_join_date !== undefined) {
            bodyParser.user_join_date = body.user_join_date;
        }
        if (body.user_deleted_at !== undefined) {
            bodyParser.user_deleted_at = body.user_deleted_at;
        }
        if (body.user_created_at !== undefined) {
            bodyParser.user_created_at = body.user_created_at;
        }
        if (body.user_updated_at !== undefined) {
            bodyParser.user_updated_at = body.user_updated_at;
        }
        return bodyParser;
    }

    public parseFilter(params: IUserFilterParams): FindOptions<InferAttributes<User>> {
        let orQuery = [];
        let andQuery = [];

        if (params.user_id !== undefined) {
            andQuery.push({ user_id: params.user_id });
        }

        if (params.user_name !== undefined) {
            // Nếu user_name_fix = 1 thì tìm chính xác, ngược lại tìm theo like
            params.user_name_fix ?
                andQuery.push({ user_name: params.user_name })
                :
                orQuery.push({ user_name: { [Op.like]: `%${params.user_name}%` } });
        }

        if (params.user_email !== undefined) {
            // Nếu user_email_fix = 1 thì tìm chính xác, ngược lại tìm theo like
            params.user_email_fix ?
                andQuery.push({ user_email: params.user_email })
                :
                orQuery.push({ user_email: { [Op.like]: `%${params.user_email}%` } });
        }

        if (params.user_phone !== undefined) {
            // Nếu user_phone_fix = 1 thì tìm chính xác, ngược lại tìm theo like
            params.user_phone_fix ?
                andQuery.push({ user_phone: params.user_phone })
                :
                orQuery.push({ user_phone: { [Op.like]: `%${params.user_phone}%` } });
        }

        if (params.user_status !== undefined) {
            Array.isArray(params.user_status) ?
                andQuery.push({ user_status: { [Op.in]: params.user_status } })
                :
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

        // option attributes
        let attributes: any = { exclude: ['user_password'] };
        if (params.exclude !== undefined) {
            if (Array.isArray(params.exclude)) {
                attributes.exclude.concat(params.exclude);
            } else {
                attributes.exclude.push(params.exclude);
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
            where: whereQuery,
        };
        // Thêm các option nếu có
        if (attributes) {
            if (params?.need_password == 1) {
                const indexNeedPassword = attributes.exclude.indexOf('user_password');
                if (indexNeedPassword !== -1) {
                    attributes.exclude.splice(indexNeedPassword, 1);
                }
            } else {
                if (attributes.exclude.indexOf('user_password') === -1) {
                    attributes.exclude.push('user_password');
                }
            }
            condition.attributes = attributes;
        }

        if (includes) {
            const includeModel = this.parseIncludeModel(includes);
            condition.include = includeModel;
        }
        // Thêm điều kiện order
        if (params.orderBy !== undefined) {
            condition.order = params.orderBy;
        } else {
            condition.order = [['user_id', 'ASC']];
        }
        if (params.limit !== undefined || params.pageSize !== undefined) {
            condition.limit = params.limit ?? params.pageSize ?? 10;
        } else {
            condition.limit = 10;
        }
        if (params.page !== undefined) {
            params.offset = (params.page - 1) * (params?.limit ?? 1);
        }
        if (params.offset !== undefined) {
            condition.offset = params.offset;
        } else {
            condition.offset = 0;
        }
        return condition;
    }

    protected parseIncludeModel(includes: string[]) {
        const modelNames: any[] = [];
        includes.forEach(include => {
            switch (include) {
                case CONSTANTS.KEY_INCLUDE_USER.PERMISSION:
                    modelNames.push({
                        model: Permission,
                        as: 'permissions',
                        attributes: ['permission_code']
                    });
                    break;
                case CONSTANTS.KEY_INCLUDE_USER.ROLE:
                    modelNames.push({ model: Role, as: 'role', attributes: ['role_id', 'role_name', 'role_code'] });
                    break;
                case CONSTANTS.KEY_INCLUDE_USER.USER:
                    modelNames.push({ model: User, as: 'create_user' });
                    break;
                default:
                    break;
            }
        });
        return modelNames;
    }
} 