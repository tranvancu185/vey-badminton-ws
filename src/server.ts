import 'module-alias/register';
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import swaggerUI from "swagger-ui-express";
import morganMiddleware from '@/configs/logger/morganMiddleware'

import swaggerSpec from "@/configs/swagger/swagger-docs";
import routes from "@/packages/routes";
import pool from '@/configs/db/mariadb';
import connectDB from '@/configs/db/mongodb';

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(
    "/api/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
        explorer: true,
    })
);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(morganMiddleware);
app.use(express.static("public"));

// API routes
app.use("/api", routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


// connectDB(); // Kết nối đến MongoDB
app.listen(PORT, async () => {
    // try {
    //     await pool.getConnection(); // Kiểm tra kết nối đến MariaDB
    //     console.log(`MariaDB Connected`);
    // } catch (error: any) {
    //     console.error(`MariaDB Connection Error: ${error?.message ?? ''}`);
    // }
    console.log(`Server is running on port ${PORT}`);
});