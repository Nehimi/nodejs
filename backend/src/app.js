import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

// Declare routes
app.use("/api/v1/users", userRoutes); // base route
app.use("/api/v1/auth", authRoutes); // authentication routes

export default app;