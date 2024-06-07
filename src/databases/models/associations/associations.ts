import { Sequelize } from '../index';
import User from '../users.model';
import Permission from '../permissions.model';
import Role from '../roles.model';
import UserPermission from '../user-permissions.model';

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