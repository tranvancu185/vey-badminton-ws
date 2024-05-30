import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import swaggerUI from "swagger-ui-express";
import swaggerJSDocs from "swagger-jsdoc";

const app: Express = express();
const port = 8080;

const definitions = {
    info: {
        // API information (required)
        title: 'Wayfarer', // Title (required)
        version: '1.0.0', // Version (required)
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
        },
    },
};

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Swagger Express API - Vey badminton api",
            version: "0.1.0",
            description:
                "Document swagger for vey badminton api",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Vey",
                url: "https://github.com/tranvancu185",
                email: "phuquytran185@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJSDocs(options);

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, { explorer: true })
);


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port  ${port}`);
});