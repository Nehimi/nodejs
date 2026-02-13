import express from "express";
import userRoutes from "./routes/user.routes.js";
const app =express();
app.use(express.json())
//declare routes
app.use("/api/v1/users",userRoutes);// base route
export default app;