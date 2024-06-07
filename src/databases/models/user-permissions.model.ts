import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index';
import User from './users.model';
import Permission from './permissions.model';


class UserPermission extends Model {
    public user_id!: number;
    public permission_id!: number;

    // Thêm các thuộc tính khác nếu cần (ví dụ: createdAt, updatedAt)
}

UserPermission.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'user_id'
            }
        },
        permission_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Permission,
                key: 'permission_id'
            }
        }
    },
    {
        sequelize,
        tableName: 'user_permissions',
        timestamps: false, // Nếu bạn không muốn sử dụng timestamps
    }
);

export default UserPermission;