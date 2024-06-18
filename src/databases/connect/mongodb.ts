import { countConnectMongoDB } from "@/helpers/check.connect";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "").then(conn => {
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            console.log(`Number of connections: ${countConnectMongoDB()}`);
        });
    } catch (error: any) {
        console.error(`Error: ${error.message ?? "MongoDB connection error!"}`);
        // process.exit(1);
    }
};

export default connectDB;