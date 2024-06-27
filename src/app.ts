require("dotenv").config();

import 'module-alias/register';

import express, { Express, Request, Response } from "express";

import Database from '@/databases/connect/db';
import { checkOverload } from '@/helpers/check.connect';
import compression from 'compression';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware';
import generateCode from './helpers/generate.code';
import helmet from 'helmet';
import morganMiddleware from '@/middlewares/morgan.middleware';
import routesV1 from "@/packages/routes";
import swaggerFile from '@/configs/swagger/swagger.json';
import swaggerSpec from "@/configs/swagger/swagger-docs";
import swaggerUI from "swagger-ui-express";

// import connectDB from '@/configs/db/mongodb';

const app: Express = express();

// Middle ware
const code = generateCode('CUSTOMER').then(code => console.log(code));
// app.use(
//     "/api/docs",
//     swaggerUI.serve,
//     swaggerUI.setup(swaggerFile)
// );
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morganMiddleware);
// Connect DB
Database.getInstance();
// checkOverload();

// Kết nối đến Mariadb


// API routes
app.use("/api/v1", routesV1);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// Middleware handle error.
app.use(errorMiddleware);

export default app;