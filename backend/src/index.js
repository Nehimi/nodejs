import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
const PORT=process.env.PORT || 8888;
dotenv.config();
const startServer = async () => {
    
    try {
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