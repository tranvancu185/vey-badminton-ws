// src/models/role.model.ts

import { DataTypes, Model, ModelAttributes } from 'sequelize';
import { sequelize } from './index';

interface RoleAttributes {
    role_id: number;
    role_name: string;
    role_description?: string; // Cho phép null
    role_code: string; // Thêm thuộc tính role_code
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
    public role_id!: number;
    public role_name!: string;
    public role_description!: string; // Cho phép null
    public role_code!: string; // Thêm thuộc tính role_code
}

// Định nghĩa các thuộc tính và kiểu dữ liệu
const roleAttributes: ModelAttributes<Role, RoleAttributes> = {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role_description: {
        type: DataTypes.STRING,
        allowNull: true, // Cho phép null
    },
    role_code: { // Thêm thuộc tính role_code
        type: DataTypes.STRING,
        allowNull: false,
    },
};

Role.init(roleAttributes, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles', // Tên bảng trong MariaDB
    timestamps: false, // Nếu bạn không cần các trường createdAt và updatedAt
});

export default Role;