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
      foreignKey: 'user_id', // Khóa ngoại trong bảng Role liên kết với User
    });
    Role.belongsTo(User, {
      foreignKey: 'user_id',
    });
  } catch (error) {
    console.error('Error creating associations:', error);
  }
}