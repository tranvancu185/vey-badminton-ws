import { FindOptions, InferAttributes, Op } from 'sequelize';

import BaseService from '../commons/base.services';
import Customer from '@/databases/models/customers.model';
import CustomerService from './customer.services';
import KeyToken from '@/databases/models/key.model';
import User from '@/databases/models/users.model';
import UserService from '@/packages/services/user.services';

export default class AuthService extends BaseService<User> {
    private customerService: CustomerService;
    private userService: UserService;

    constructor() {
        super(User);
        this.customerService = new CustomerService();
        this.userService = new UserService();
    }

    public createKeyToken = async (user_id: number, user_code: string, publicKey: any) => {
        const publicKeyString = publicKey.toString();
        const token = await KeyToken.create({
            user_id: user_id,
            user_code: user_code,
            public_key: publicKeyString,
        });

        return token ? token?.public_key : null;
    }
} 