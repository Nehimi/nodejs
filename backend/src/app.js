import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

app.use(express.json());

// Declare routes
app.use("/api/v1/users", userRoutes);     // user endpoints
app.use("/api/v1/auth", authRoutes);     // authentication endpoints
app.use("/api/v1/admin", adminRoutes);  // admin-only endpoints

export default app;