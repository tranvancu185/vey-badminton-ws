import { Sequelize } from '../index';
import User from '../users.model';
import Permission from '../permissions.model';
import Role
  from '../roles.model';
export default function createAssociations(sequelize: Sequelize) {
  // User - Permission (Many-to-Many)
  User.belongsToMany(Permission, {
    through: 'user_permissions', // Tên bảng trung gian
    foreignKey: 'user_id',       // Khóa ngoại trong bảng user_permissions liên kết với user
    otherKey: 'permission_id',  // Khóa ngoại trong bảng user_permissions liên kết với permission
    as: 'user_permissions'
  });

  Permission.belongsToMany(User, {
    through: 'user_permissions',
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
}