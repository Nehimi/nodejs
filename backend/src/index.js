import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config({
    path: "./.env"

});
const startServer = async () => {
    try {
        await connectDB();
        app.on("error", (error) => {
            console.error(`server error:${error}`);
            process.exit(1);
        });

        app.listen(process.env.PORT || 8000, () => {
            console.log(`server is running on port ${process.env.PORT || 8000}`);
        });
    }
    catch (error) {
        console.error(`MongoDb connection failed:${error}`);
        process.exit(1);
    }
}

startServer