const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
try{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        return res.status(400).json({message:"Username, email, and password are required"});
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const  hashedpassword=await bcrypt.hash(password,salt);
    const user=await User.create({username,email,password:hashedpassword});
    const token=jwt.sign({
        userId:user._id,
        username:user.username,
    },
    process.env.JWT_SECRET,{expiresIn:"1h"}
);
    res.status(201).json({message:"User created successfully",token,user:{
        id:user._id,
        username:user.username,
        email:user.email,
    }});
    
}catch(error){
    res.status(500).json({message:error.message});
}
};
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({message:"Invalid CREDENTIALS"});
        }
        const token=jwt.sign({
            userId:user._id,
            username:user.username,
        },
        process.env.JWT_SECRET,{expiresIn:"1h"}
    );
        res.status(200).json({message:"Login successful",token,user:{
            id:user._id,
            email:user.email,
            username:user.username,
        }
    });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
module.exports={register, login};
