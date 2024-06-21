// src/models/keys_token.model.ts

import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index'; // Import kết nối Sequelize đến MariaDB của bạn

// Interface định nghĩa kiểu dữ liệu cho các thuộc tính của KeyToken
interface KeyTokenAttributes {
    key_id?: number;
    user_id: number;
    user_code: string;
    public_key: string;
    refresh_token?: string | null;
}

class KeyToken extends Model<KeyTokenAttributes> implements KeyTokenAttributes {
    public key_id!: number;
    public user_id!: number;
    public user_code!: string;
    public public_key!: string;
    public refresh_token!: string | null;
}

KeyToken.init(
    {
        key_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        public_key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'KeyToken',
        tableName: 'keys_token',
        timestamps: false, // Nếu bạn không cần createdAt và updatedAt
    }
);

export default KeyToken;
