import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@/databases/models/index'; // Import kết nối Sequelize đến MariaDB

interface UUIDCodeAttributes {
    id: number;
    code: string;
    prefix: string;
    created_at: Date;
    sequence: number;
}

class UUIDCode extends Model<UUIDCodeAttributes> implements UUIDCodeAttributes {
    public id!: number;
    public code!: string;
    public prefix!: string;
    public created_at!: Date;
    public sequence!: number;
}

UUIDCode.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING(12), // Tối đa 12 ký tự cho mã code
        allowNull: false,
        unique: true,
    },
    prefix: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATEONLY, // Chỉ lưu ngày, không cần giờ
        allowNull: false,
    },
    sequence: {
        type: DataTypes.INTEGER.UNSIGNED, // Chỉ lưu số nguyên dương
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'UUIDCode',
    tableName: 'uuid_codes',
    timestamps: false, // Không sử dụng createdAt và updatedAt
});

export default UUIDCode;
