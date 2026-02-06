import {User} from "../models/user.model.js";

const registerUser=async(req,res)=>{

    try{
const {username,password,email}=req.body;
// basic validation

if(!username||!email||!password){
    return res.status(400).json({message:"all fields are required"});

}
// check if user already exists
const userExists=await User.findOne({email:email.toLowerCase()});

    if(userExists){
        return res.status(400).json(
            {
            message:"user already exists"
        });
    }
// create new user
const user= await User.create({
    username,
    email,
    password,
    loggedIn:false
}) 
res.status(201).json({message:"user registered successfully",user:{
   id:user._id,
    email:user.email,
    username:user.username,
}});
    }
    catch(error){
res.status(500).json({message:"Internal server error",error});
    }
}

export {registerUser};