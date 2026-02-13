import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})?$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Hash password before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    
    const saltRounds=10;// means 10 times mefichet
    this.password=await bcrypt.hash(this.password,saltRounds);
    next();

});

// helper metode to compare password

userSchema.methods.comparePassword= async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}



const User = mongoose.model('User', userSchema);

export default User;
