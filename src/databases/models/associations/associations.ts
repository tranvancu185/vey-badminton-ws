import Permission from '@/databases/models/permissions.model';
import Role from '@/databases/models/roles.model';
import { Sequelize } from '@/databases/models/index';
import User from '@/databases/models/users.model';
import UserPermission from '@/databases/models/user-permissions.model';

// import Store from '@/databases/models/store';
// import KeyToken from '@/databases/models/key.model';
// import Order from '@/databases/models/order.model';
// import Customer from '@/databases/models/customers.model';
// import OrderDetail from '@/databases/models/order-detail.model';
// import Product from '@/databases/models/product.model';
// import Warehouse from '@/databases/models/warehouse.model';
// import WarehouseDetail from '@/databases/models/warehouse-detail.model';
// import WarehouseType from '@/databases/models/warehouse-type.model';
// import Voucher from '@/databases/models/voucher.model';
// import Brand from '@/databases/models/brand.model';
// import City from '@/databases/models/city.model';
// import District from '@/databases/models/district.model';
// import Ward from '@/databases/models/ward.model';
// import Department from '@/databases/models/department.model';
// import Position from '@/databases/models/position.model';

export default function createAssociations(sequelize: Sequelize) {
  console.log('Associations are being created...');
  try {
    // User - Permission (Many-to-Many)
    User.belongsToMany(Permission, {
      through: UserPermission,
      foreignKey: 'user_id',
      otherKey: 'permission_id',
      as: 'permissions',
    });

    Permission.belongsToMany(User, {
      through: UserPermission,
      foreignKey: 'permission_id',
      otherKey: 'user_id',
    });

    // User - Role (One-to-One)
    User.hasOne(Role, {
      foreignKey: 'role_id', // Khóa ngoại user_id trong bảng roles
      as: 'role', // Tên quan hệ trong bảng User
    });
    Role.belongsTo(User, {
      foreignKey: 'user_role_id',
    });

  } catch (error) {
    console.error('Error creating associations:', error);
  }
}