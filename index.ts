import "reflect-metadata"; // Import reflect-metadata at the top of your entry file

import express, { Request, Response, Express } from "express";
import { addRoutes } from "./src/config/routes.config";
import { responseFormatter } from "./src/middleware/responseFormatter.middleware";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import cors, { CorsOptions } from "cors";

dotenv.config(); // Load environment variables from .env file

const app: Express = express();
const port = process.env.PORT;

let corsOptions: CorsOptions = {
    origin: "http://localhost:3000", // !! Replace with your frontend URL!!
};

app.use(cors()); 

app.use(express.json()); // Middleware to parse JSON bodies
app.use(responseFormatter); // Middleware to format responses

addRoutes(app); // Add routes to the app

async function bootstrap() {

    if(!process.env.DATABASE_URL) { 
        throw new Error("DATABASE_URL is not defined in .env file");
        process.exit(1);
    }
    try{
        await mongoose.connect(process.env.DATABASE_URL, {
                dbName: process.env.DATABASE_NAME,
            }
        );
        console.log("Connected to MongoDB successfully!");

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    }
    catch(error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}

bootstrap();

