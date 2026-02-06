import express from "express";
import userRoutes from "./routes/user.routes.js";
const app =express();// creatae an express application
app.use(express.json());//middleware to parse json request bodies/routes
//declare routes
app.use("/api/v1/users",userRoutes);
//example route: http://localhost:5000/api/v1/users/register

export default app;