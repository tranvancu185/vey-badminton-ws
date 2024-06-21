// src/models/store.model.ts

import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { sequelize } from './index'; // Import kết nối Sequelize đến MariaDB của bạn

// Interface định nghĩa kiểu dữ liệu cho các thuộc tính của Store
interface StoreAttributes {
    store_id: number;
    store_name: string;
    store_code: string;
    store_status?: number;  // Optional, mặc định là 0
    store_description?: string; // Optional
    store_properties?: string; // Optional, JSON string
    store_config?: number;    // Optional, mặc định là 0
    store_full_address?: string; // Optional
    store_detail_address?: string; // Optional
    store_provice_id?: number;    // Optional
    store_district_id?: number;   // Optional
    store_ward_id?: number;       // Optional
    store_deleted_at?: number;    // Optional
    store_created_at?: number;    // Optional
    store_updated_at?: number;    // Optional
}

class Store extends Model<StoreAttributes> implements StoreAttributes {
    public store_id!: number;
    public store_name!: string;
    public store_code!: string;
    public store_status?: number;
    public store_description?: string;
    public store_properties?: string;
    public store_config?: number;
    public store_full_address?: string;
    public store_detail_address?: string;
    public store_provice_id?: number;
    public store_district_id?: number;
    public store_ward_id?: number;
    public store_deleted_at?: number;
    public store_created_at?: number;
    public store_updated_at?: number;
}

// Định nghĩa các thuộc tính và kiểu dữ liệu của model
const storeAttributes: ModelAttributes<Store, StoreAttributes> = {
    store_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    store_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    store_status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    store_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    store_properties: {
        type: DataTypes.STRING, // Lưu trữ dưới dạng JSON string
        allowNull: true,
        get() { // Hàm để tự động chuyển đổi từ JSON string sang object khi lấy dữ liệu
            const rawValue = this.getDataValue('store_properties');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value: string) { // Hàm để tự động chuyển đổi từ object sang JSON string khi lưu dữ liệu
            this.setDataValue('store_properties', value ? JSON.stringify(value) : '');
        }
    },
    store_config: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    store_full_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // ... (Các thuộc tính khác tương tự)
};

Store.init(storeAttributes, {
    sequelize,
    modelName: 'Store',
    tableName: 'stores', // Tên bảng trong MariaDB
    timestamps: false, // Không sử dụng các cột createdAt và updatedAt
});

export default Store;