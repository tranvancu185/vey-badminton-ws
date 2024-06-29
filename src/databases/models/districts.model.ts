// src/models/district.model.ts

import { DataTypes, Model, ModelAttributes } from 'sequelize';

import City from '@/databases/models/cities.model'; // Import model City
import { sequelize } from '@/databases/models/index'; // Import kết nối Sequelize đến MariaDB

// Interface định nghĩa kiểu dữ liệu cho các thuộc tính của District
interface DistrictAttributes {
    district_id: number;
    district_name: string;
    district_name_en?: string | null; // Optional
    district_full_name?: string | null; // Optional
    district_full_name_en?: string | null; // Optional
    district_code_name?: string | null; // Optional
    district_code: string;
    district_description?: string | null; // Optional
    district_properties?: string | null; // Optional, JSON string
    city_id?: number | null; // Optional
}

// Model District kế thừa từ Model và implement interface DistrictAttributes
class District extends Model<DistrictAttributes> implements DistrictAttributes {
    public district_id!: number;
    public district_name!: string;
    public district_name_en!: string | null;
    public district_full_name!: string | null;
    public district_full_name_en!: string | null;
    public district_code_name!: string | null;
    public district_code!: string;
    public district_description!: string | null;
    public district_properties!: string | null;
    public city_id!: number | null; // Optional

    // Khai báo các getter và setter cho district_properties để xử lý JSON
    public get district_properties_object(): any {
        return this.district_properties ? JSON.parse(this.district_properties) : null;
    }

    public set district_properties_object(value: any) {
        this.district_properties = value ? JSON.stringify(value) : null;
    }
}

// Định nghĩa các thuộc tính và kiểu dữ liệu của model
const districtAttributes: ModelAttributes<District, DistrictAttributes> = {
    district_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    district_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district_name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district_full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district_full_name_en: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district_code_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    district_properties: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city_id: { // Khóa ngoại (foreign key) tham chiếu đến bảng cities
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: City,  // Model mà khóa ngoại tham chiếu tới
            key: 'city_id' // Cột trong model City mà khóa ngoại tham chiếu tới
        },
        onDelete: 'SET NULL', // Nếu city bị xóa, district_id sẽ được đặt thành NULL
        onUpdate: 'CASCADE'   // Nếu city_id trong bảng cities thay đổi, district_id cũng sẽ được cập nhật
    }
};

District.init(districtAttributes, {
    sequelize,
    modelName: 'District',
    tableName: 'districts', // Tên bảng trong MariaDB
});

export default District;
