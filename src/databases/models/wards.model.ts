// src/models/ward.model.ts

import { DataTypes, Model, ModelAttributes } from 'sequelize';

import City from '@/databases/models/cities.model'; // Import model City
import District from '@/databases/models/districts.model'; // Import model District
import { sequelize } from '@/databases/models/index'; // Import sequelize instance

interface WardAttributes {
    ward_id: number;
    ward_name: string;
    ward_name_en?: string | null;
    ward_full_name?: string | null;
    ward_full_name_en?: string | null;
    ward_code_name?: string | null;
    ward_code: string;
    ward_description?: string | null;
    ward_properties?: string | null; // JSON string
    district_id?: number | null;
    city_id?: number | null;
}

class Ward extends Model<WardAttributes> implements WardAttributes {
    public ward_id!: number;
    public ward_name!: string;
    public ward_name_en!: string | null;
    public ward_full_name!: string | null;
    public ward_full_name_en!: string | null;
    public ward_code_name!: string | null;
    public ward_code!: string;
    public ward_description!: string | null;
    public ward_properties!: string | null;
    public district_id!: number | null;
    public city_id!: number | null;

    // Getter & setter for ward_properties
    public get ward_properties_object(): any {
        return this.ward_properties ? JSON.parse(this.ward_properties) : null;
    }

    public set ward_properties_object(value: any) {
        this.ward_properties = value ? JSON.stringify(value) : null;
    }
}

const wardAttributes: ModelAttributes<Ward, WardAttributes> = {
    ward_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    ward_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ward_name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ward_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ward_full_name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ward_code_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ward_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ward_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ward_properties: {
        type: DataTypes.STRING, // Lưu dưới dạng JSON string
        allowNull: true,
    },
    district_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: District, // Liên kết tới model District
            key: 'district_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    city_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: City, // Liên kết tới model City
            key: 'city_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
};

Ward.init(wardAttributes, {
    sequelize,
    modelName: 'Ward',
    tableName: 'wards',
});

export default Ward;
