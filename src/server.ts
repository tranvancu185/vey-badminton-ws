import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "@/configs/swagger/swagger-docs";
import routes from "@/routes/routes";
import morgan from "morgan";

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(
    "/api/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
        explorer: true,
        swaggerOptions: {
            url: "/swagger.json",
        },
    })
);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

// API routes
app.use("/api", routes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port  ${PORT}`);
});