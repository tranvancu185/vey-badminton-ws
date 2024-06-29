// src/models/city.model.ts

import { DataTypes, Model, ModelAttributes } from 'sequelize';

import { sequelize } from '@/databases/models/index'; // Import kết nối Sequelize đến MariaDB của bạn

// Interface định nghĩa kiểu dữ liệu cho các thuộc tính của City
interface CityAttributes {
    city_id: number;
    city_name: string;
    city_name_en?: string | null; // Optional
    city_full_name?: string | null; // Optional
    city_full_name_en?: string | null; // Optional
    city_code_name?: string | null; // Optional
    city_code: string;
    city_description?: string | null; // Optional
    city_properties?: string | null; // Optional
}

// Model City kế thừa từ Model và implement interface CityAttributes
class City extends Model<CityAttributes> implements CityAttributes {
    public city_id!: number;
    public city_name!: string;
    public city_name_en!: string | null;
    public city_full_name!: string | null;
    public city_full_name_en!: string | null;
    public city_code_name!: string | null;
    public city_code!: string;
    public city_description!: string | null;
    public city_properties!: string | null;
}

// Định nghĩa các thuộc tính và kiểu dữ liệu của model
const cityAttributes: ModelAttributes<City, CityAttributes> = {
    city_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city_full_name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city_code_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city_properties: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('city_properties');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('city_properties', value ? JSON.stringify(value) : null);
        }
    }
};

City.init(cityAttributes, {
    sequelize,
    modelName: 'City',
    tableName: 'cities', // Tên bảng trong MariaDB
});

export default City;
