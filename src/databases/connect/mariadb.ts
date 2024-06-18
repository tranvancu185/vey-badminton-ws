import createAssociations from '@/databases/models/associations/associations';
import { sequelize } from '@/databases/models';

const connectMariaDB = async () => {
    await sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            // Đồng bộ models với database
            createAssociations(sequelize);
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            process.exit(1);
        });
};

export default connectMariaDB;