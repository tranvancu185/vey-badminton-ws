import { FindOptions, InferAttributes, Op } from 'sequelize';

import BaseService from '../commons/base.services';
import Customer from '@/databases/models/customers.model';
import CustomerService from '../customers/customer.services';
import User from '@/databases/models/users.model';
import UserService from '../users/user.services';

export default class AuthService extends BaseService<User> {
    private customerService: CustomerService;
    private userService: UserService;

    constructor() {
        super(User);
        this.customerService = new CustomerService();
        this.userService = new UserService();
    }

} 