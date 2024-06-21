import { FindOptions, InferAttributes, Op } from 'sequelize';

import BaseService from '../commons/base.services';
import Customer from '@/databases/models/customers.model';
import ICustomer from '../interfaces/customer.interfaces';
import { IFilterParams } from '../interfaces/customer.interfaces';

export default class CustomerService extends BaseService<Customer> {

    constructor() {
        super(Customer);
    }

    public parseBody(body: any): ICustomer {
        const bodyParser: any = {};

        return bodyParser;
    }

    public parseFilter(params: IFilterParams): FindOptions<InferAttributes<Customer>> {
        let orQuery = [];
        let andQuery = [];

        if (params.customer_id !== undefined) {
            orQuery.push({ customer_id: params.customer_id });
        }

        if (params.customer_name !== undefined) {
            // Nếu customer_name_fix = 1 thì tìm chính xác, ngược lại tìm theo like
            if (params.customer_name_or !== undefined) {
                params.customer_name_fix ?
                    orQuery.push({ customer_name: params.customer_name })
                    :
                    orQuery.push({ customer_name: { [Op.like]: `%${params.customer_name}%` } });
            } else {
                params.customer_name_fix ?
                    andQuery.push({ customer_name: params.customer_name })
                    :
                    andQuery.push({ customer_name: { [Op.like]: `%${params.customer_name}%` } });
            }

        }

        if (params.customer_email !== undefined) {
            // Nếu customer_email_fix = 1 thì tìm chính xác, ngược lại tìm theo like
            if (params.customer_email_or) {
                params.customer_email_fix ?
                    orQuery.push({ customer_email: params.customer_email })
                    :
                    orQuery.push({ customer_email: { [Op.like]: `%${params.customer_email}%` } });
            } else {
                params.customer_email_fix ?
                    andQuery.push({ customer_email: params.customer_email })
                    :
                    andQuery.push({ customer_email: { [Op.like]: `%${params.customer_email}%` } });
            }
        }

        if (params.customer_phone !== undefined) {
            // Nếu customer_phone_fix = 1 thì tìm chính xác, ngược lại tìm theo like
            if (params.customer_phone_or !== undefined) {
                params.customer_phone_fix ?
                    orQuery.push({ customer_phone: params.customer_phone })
                    :
                    orQuery.push({ customer_phone: { [Op.like]: `%${params.customer_phone}%` } });
            } else {
                params.customer_phone_fix ?
                    andQuery.push({ customer_phone: params.customer_phone })
                    :
                    andQuery.push({ customer_phone: { [Op.like]: `%${params.customer_phone}%` } });
            }

        }

        if (params.customer_status !== undefined) {
            Array.isArray(params.customer_status) ?
                andQuery.push({ customer_status: { [Op.in]: params.customer_status } })
                :
                andQuery.push({ customer_status: params.customer_status });
        }

        if (params.customer_code !== undefined) {
            andQuery.push({ customer_code: params.customer_code });
        }

        if (params.customer_create_by !== undefined) {
            andQuery.push({ customer_create_by: params.customer_create_by });
        }

        if (params.create_from_date !== undefined && params.create_to_date !== undefined) {
            andQuery.push({
                customer_created_at: {
                    [Op.between]: [params.create_from_date, params.create_to_date]
                }
            });
        }

        if (params.join_from_date !== undefined && params.join_to_date !== undefined) {
            andQuery.push({
                customer_join_date: {
                    [Op.between]: [params.join_from_date, params.join_to_date]
                }
            });
        }

        if (params.delete_from_date !== undefined && params.delete_to_date !== undefined) {
            andQuery.push({
                customer_updated_at: {
                    [Op.between]: [params.delete_from_date, params.delete_to_date]
                }
            });
        }

        const whereQuery: any = {};

        if (orQuery.length !== 0) {
            whereQuery[Op.or] = orQuery;
        }
        if (andQuery.length !== 0) {
            whereQuery[Op.and] = andQuery;
        }

        // option attributes
        let attributes: any = { exclude: ['customer_password'] };
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
        const condition: FindOptions<InferAttributes<Customer>> = {
            where: whereQuery
        };
        // Thêm các option nếu có
        if (attributes) {
            if (params?.need_password == 1) {
                const indexNeedPassword = attributes.exclude.indexOf('customer_password');
                if (indexNeedPassword !== -1) {
                    attributes.exclude.splice(indexNeedPassword, 1);
                }
            } else {
                if (attributes.exclude.indexOf('customer_password') === -1) {
                    attributes.exclude.push('customer_password');
                }
            }
            condition.attributes = attributes;
        }

        if (includes) {
            condition.include = includes;
        }
        // Thêm điều kiện order
        if (params.orderBy !== undefined) {
            condition.order = params.orderBy;
        } else {
            condition.order = [['customer_id', 'ASC']];
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
} 