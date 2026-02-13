import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 8888;

dotenv.config();

// Validate required environment variables
const startServer = async () => {
    try {
        // Check required environment variables
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is required');
        }
        
        if (!process.env.MONGODB_URL) {
            throw new Error('MONGODB_URL environment variable is required');
        }

        console.log('Environment variables validated successfully');
        await connectDB();
        console.log("Database connection enabled");
        
        app.on("error", (error) => {
            console.error(`server error:${error}`);
            process.exit(1);
        });

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error(`Server startup failed:${error}`);
        process.exit(1);
    }
}

startServer();