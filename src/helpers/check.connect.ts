import loggerDiscord, { IDiscordLogger } from "@/utils/discord-logger";

import mongoose from "mongoose";
import os from 'os';
import { sequelize } from '@/databases/models';

// import process from "process";

const _SECOND = 5000;

export const countConnectMariaDB = async () => {
    const connection: any = await sequelize.connectionManager.getConnection({ type: 'read' }); // Lấy kết nối
    try {
        if (connection.name === 'mariadb') {
            const pool = connection._pool as any; // Ép kiểu any để tránh lỗi TypeScript
            if (pool) {
                const numConnections = pool.inUse + pool.idle;
                return numConnections;
            }
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        connection.close();
    }
    return 0;
};

export const countConnectMongoDB = async () => {
    try {
        const openConnections = mongoose.connections.filter(conn => conn.readyState === 1);
        const numConnections = openConnections.length;
        return numConnections;
    } catch (error) {
        console.error('Error:', error);
    }
    return 0;
};

export const checkConnect = async () => {
    setInterval(async () => {
        // const numConnectionsMariaDB = await countConnectMariaDB();
        // const numConnectionsMongoDB = await countConnectMongoDB();
        console.log('---------------------------------------------');
        console.log('Số lượng CPU:', os.cpus().length);
        console.log('Số lượng RAM:', os.totalmem() / 1024 / 1024 / 1024, 'GB');
        // console.log('Số lượng kết nối MariaDB:', numConnectionsMariaDB);
        // console.log('Số lượng kết nối MongoDB:', numConnectionsMongoDB);
        console.log('---------------------------------------------');
    }, _SECOND);
};

export const checkOverload = async () => {
    setInterval(async () => {
        const cpuUsage = os.loadavg()[0] / os.cpus().length * 100;
        const ramUsage = os.totalmem() - os.freemem();
        const numCores = os.cpus().length;
        // const memoryUsage = process.memoryUsage().rss;
        // const numConnectionsMariaDB = await countConnectMariaDB();
        // const numConnectionsMongoDB = await countConnectMongoDB();
        const maxConnection = numCores * 5;

        // if (numConnectionsMariaDB > maxConnection || numConnectionsMongoDB > maxConnection) {
        //     console.error('Overload connections!');
        //     loggerDiscord.error({
        //         message: 'Overload connections!',
        //         meta: {
        //             'CPU Usage': cpuUsage.toFixed(2) + '%',
        //             'RAM Usage': (ramUsage / 1024 / 1024 / 1024) + 'GB',
        //             // 'MariaDB Connections': numConnectionsMariaDB,
        //             // 'MongoDB Connections': numConnectionsMongoDB
        //         } as IDiscordLogger['meta']
        //     }
        //     );
        // }

        console.log('---------------------------------------------');
        console.log('CPU Usage:', cpuUsage.toFixed(2), '%');
        console.log('RAM Usage:', ramUsage / 1024 / 1024 / 1024, 'GB');
        // console.log('MariaDB Connections:', numConnectionsMariaDB);
        // console.log('MongoDB Connections:', numConnectionsMongoDB);
        console.log('---------------------------------------------');
    }, _SECOND);
};

