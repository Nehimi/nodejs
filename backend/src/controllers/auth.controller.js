import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT Token
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    
    return jwt.sign(
        { id },//payload
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",//expires in
        }
    );
};

// User Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;//destructuring

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

// User Logout (in practice, logout is handled client-side by removing token)
export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};

// Get Current User (for protected routes)
export const getMe = async (req, res) => {
    try {
        // req.user will be set by auth middleware
        const user = await User.findById(req.user.id).select("-password");
        
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get user",
            error: error.message
        });
    }
};