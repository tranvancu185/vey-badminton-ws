// src/models/customer.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index'; // Import sequelize instance

interface CustomerAttributes {
    customer_id: number;
    customer_name: string;
    customer_email?: string; // Optional
    customer_avatar: string;
    customer_phone: string;
    customer_code: string;
    customer_status: number; // 0: inactive, 1: active, 2: deleted
    customer_birthday?: number; // Optional
    customer_description?: string; // Optional
    customer_properties?: string; // JSON string
    customer_config: number; // Bitwise value
    customer_password: string;
    customer_full_address?: string; // Optional
    customer_detail_address?: string; // Optional
    customer_provide_id?: number; // Optional
    customer_district_id?: number; // Optional
    customer_ward_id?: number; // Optional
    customer_create_by?: number; // Optional
    customer_join_date?: number; // Optional
    customer_deleted_at?: number; // Optional
    customer_created_at?: number; // Optional
    customer_updated_at?: number; // Optional
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'customer_id'> { }

class Customer extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
    public customer_id!: number;
    public customer_name!: string;
    public customer_email!: string; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_avatar!: string;
    public customer_phone!: string;
    public customer_code!: string;
    public customer_status!: number;
    public customer_birthday!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_description!: string; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_properties!: string; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_config!: number;
    public customer_password!: string;
    public customer_full_address!: string; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_detail_address!: string; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_provide_id!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_district_id!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_ward_id!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_create_by!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_join_date!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_deleted_at!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_created_at!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định
    public customer_updated_at!: number; // Lưu ý: Không còn optional vì đã có giá trị mặc định

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Customer.init(
    {
        customer_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true, // Đảm bảo email là duy nhất
            validate: {
                isEmail: true, // Kiểm tra định dạng email (nếu có)
            },
        },
        customer_avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'default.jpg',
        },
        customer_phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Đảm bảo số điện thoại là duy nhất
        },
        customer_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Đảm bảo mã khách hàng là duy nhất
        },
        customer_status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0, // 0: inactive, 1: active, 2: deleted
        },
        customer_birthday: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        customer_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customer_properties: {
            type: DataTypes.JSON, // Lưu trữ dữ liệu JSON
            allowNull: true,
        },
        customer_config: {
            type: DataTypes.INTEGER, // Lưu trữ giá trị bitwise
            allowNull: true,
            defaultValue: 0,
        },
        customer_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customer_full_address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customer_detail_address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customer_provide_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        customer_district_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        customer_ward_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        customer_create_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        customer_join_date: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        customer_deleted_at: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        customer_created_at: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        customer_updated_at: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Customer',
        tableName: 'customers', // Tên bảng trong cơ sở dữ liệu
        timestamps: false
    }
);

export default Customer;
