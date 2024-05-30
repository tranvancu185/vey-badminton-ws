import swaggerJSDocs from "swagger-jsdoc";

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

export default swaggerJSDocs(options);