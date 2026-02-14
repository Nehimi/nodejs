import User from "../models/User.js";

// Create admin user (for initial setup)
export const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        
        // Create admin user
        const admin = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password,
            role: "admin"
        });
        
        await admin.save();
        
        res.status(201).json({
            success: true,
            message: "Admin user created successfully",
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create admin",
            error: error.message
        });
    }
};

// Get all users (admin only)
export const getAllUsersAdmin = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            message: "All users retrieved successfully",
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error.message
        });
    }
};

// Update user role (admin only)
export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role. Must be 'user' or 'admin'"
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { 
                new: true,
                runValidators: true 
            }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update user role",
            error: error.message
        });
    }
};

// Delete user (admin only)
export const deleteUserAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        // Prevent admin from deleting themselves
        if (id === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete your own account"
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

// Get system stats (admin only)
export const getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const adminUsers = await User.countDocuments({ role: 'admin' });
        const regularUsers = await User.countDocuments({ role: 'user' });

        res.status(200).json({
            success: true,
            message: "System statistics retrieved",
            data: {
                totalUsers,
                adminUsers,
                regularUsers,
                currentUserRole: req.user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get system stats",
            error: error.message
        });
    }
};
