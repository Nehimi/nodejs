import mongoose from "mongoose";

const blacklistedTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for efficient queries
blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Clean up expired tokens automatically
blacklistedTokenSchema.index({ token: 1, userId: 1 });

export const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
