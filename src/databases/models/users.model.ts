import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './index'; // Import sequelize instance của bạn
import Permission from './permissions.model';

export interface UserAttributes {
    user_id: number;
    user_name: string;
    user_email?: string;  // Cho phép null
    user_avatar: string;
    user_phone: string;
    user_full_address?: string;
    user_detail_address?: string;
    user_provice_id?: string;
    user_district_id?: string;
    user_ward_id?: string;
    user_code: string;
    user_status?: number; // Cho phép null
    user_birthday?: number; // Cho phép null
    user_description?: string; // Cho phép null
    user_properties?: string; // Cho phép null
    user_config: number;
    user_password: string;
    user_role_id?: number; // Cho phép null
    user_department_id?: number; // Cho phép null
    user_position_id?: number; // Cho phép null
    user_create_by?: number; // Cho phép null
    user_join_date?: number; // Cho phép null
    user_deleted_at?: number; // Cho phép null
    user_created_at?: number; // Cho phép null
    user_updated_at?: number; // Cho phép null
    permissions?: Permission[] | string[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> { } // Loại trừ 'user_id' khi tạo mới

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public user_id!: number;
    public user_name!: string;
    public user_email!: string;
    public user_avatar!: string;
    public user_phone!: string;
    public user_full_address!: string;
    public user_detail_address!: string;
    public user_provice_id!: string;
    public user_district_id!: string;
    public user_ward_id!: string;
    public user_code!: string;
    public user_status!: number;
    public user_birthday!: number;
    public user_description!: string;
    public user_properties!: string;
    public user_config!: number;
    public user_password!: string;
    public user_role_id!: number;
    public user_department_id!: number;
    public user_position_id!: number;
    public user_create_by!: number;
    public user_join_date!: number;
    public user_deleted_at!: number;
    public user_created_at!: number;
    public user_updated_at!: number;
    public permissions!: Permission[] | string[];

    // Các phương thức của Model
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false, // Cho phép null
            unique: true, // Đảm bảo tính duy nhất của email
            validate: {
                isEmail: true, // Kiểm tra định dạng email
            },
        },
        user_avatar: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'default.jpg',
        },
        user_phone: {
            type: DataTypes.STRING,
            unique: true, // Đảm bảo tính duy nhất của email
            allowNull: false,
        },
        user_full_address: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.STRING,
        },
        user_detail_address: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.STRING,
        },
        user_provice_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        },
        user_district_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        },
        user_ward_id: {
            allowNull: true,
            defaultValue: null,
            type: DataTypes.INTEGER,
        },
        user_code: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Đảm bảo tính duy nhất của user_code
        },
        user_status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0, // 0: inactive, 1: active, 2: deleted
        },
        user_birthday: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        user_description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_properties: {
            type: DataTypes.JSON, // Hoặc DataTypes.STRING nếu bạn muốn lưu trữ dưới dạng JSON string
            allowNull: true,
        },
        user_config: {
            type: DataTypes.INTEGER, // Lưu trữ giá trị bitwise
            allowNull: true,
            defaultValue: 0,
        },
        user_password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        user_department_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user_position_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user_create_by: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user_join_date: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        user_deleted_at: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        user_created_at: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
        user_updated_at: {
            type: DataTypes.INTEGER, // Lưu trữ timestamp (số giây)
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users', // Tên bảng trong cơ sở dữ liệu (nếu khác với tên model)
        createdAt: 'user_created_at', // Đổi tên trường createdAt
        updatedAt: 'user_updated_at', // Đổi tên trường updatedAt
    }
);

export default User;
