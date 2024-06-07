// src/models/permission.model.ts

import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index'; // Import kết nối Sequelize đến MariaDB của bạn

export interface PermissionAttributes {
    permission_id: number;
    permission_partten: string;
    permission_name: string;  // Cho phép null
    permission_code: string;
    permission_description?: string;
}

class Permission extends Model {
    public permission_id!: number;
    public permission_partten!: string;
    public permission_name!: string;
    public permission_code!: string;
    public permission_description!: string | null; // Cho phép null
}

Permission.init({
    permission_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    permission_partten: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    permission_description: {
        type: DataTypes.STRING,
        allowNull: true, // Cho phép null
    },
}, {
    sequelize,
    modelName: 'Permission',
    tableName: 'permissions', // Tên bảng trong MariaDB
    timestamps: false, // Nếu bạn không cần các trường createdAt và updatedAt
});

export default Permission;