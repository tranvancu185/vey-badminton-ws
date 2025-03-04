const swaggerAutogen = require('swagger-autogen');

const ModelsSchema = require('./schemas/models/index.js');
const ParamsSchema = require('./schemas/params/index.js');
const ResponsesSchema = require('./schemas/responses/index.js');

const doc = {
    info: {
        version: "1.0.0",
        title: "Vey Badminton WS API",
        description: "API documentation for Vey Badminton WS"
    },
    host: "localhost:3000", // Thay đổi nếu cần
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "User",
            description: "User package"
        },
        {
            name: "Auth",
            description: "Auth package"
        },
        {
            name: "Product",
            description: "Product package"
        },
        {
            name: "Order",
            description: "Order package"
        },
        {
            name: "Customer",
            description: "Customer package"
        }
        // Thêm các tag khác nếu cần
    ],
    securityDefinitions: {
        bearerAuth: {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "For accessing the API a valid JWT token must be passed in all the queries in the 'Authorization' header. A valid JWT token is generated by the API and retured as answer of a call to the route /login giving a valid user & password. The following syntax must be used in the 'Authorization' header : Bearer: your_jwt_token."
        }
    },
    definitions: {
        ...ModelsSchema,
        ...ParamsSchema,
        ...ResponsesSchema,
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.ts']; // Đường dẫn đến các file định nghĩa route
// const endpointsFiles = ['./src/packages/*/routes.ts']; // Đường dẫn đến các file định nghĩa route

swaggerAutogen(outputFile, endpointsFiles, doc);
