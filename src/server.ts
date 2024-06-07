require("dotenv").config();
import 'module-alias/register';
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import morganMiddleware from '@/configs/logger/morganMiddleware'
import swaggerUI from "swagger-ui-express";

import { sequelize } from './databases/models';

import swaggerFile from '@/configs/swagger/swagger.json';
import swaggerSpec from "@/configs/swagger/swagger-docs";
import routes from "@/packages/routes";
import createAssociations from './databases/models/associations/associations';
import errorMiddleware from './middlewares/error-middleware';
// import connectDB from '@/configs/db/mongodb';

const app: Express = express();
const PORT = process.env.PORT || 8000;

// app.use(
//     "/api/docs",
//     swaggerUI.serve,
//     swaggerUI.setup(swaggerFile)
// );


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

// Middleware handle error.
app.use(errorMiddleware);

// connectDB(); // Kết nối đến MongoDB
app.listen(PORT, async () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            // Đồng bộ models với database (chỉ cần chạy một lần)
            createAssociations(sequelize);
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    console.log(`Server is running on port ${PORT}\n URL: http://localhost:${PORT}`);
});