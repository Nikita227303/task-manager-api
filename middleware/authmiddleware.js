    const jwt=require("jsonwebtoken");
    const authmiddleware=(req,res,next)=>{
        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message:"unauthorized"});
        }
        const token=authHeader.substring(7);
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(401).json({message:"Invalid token"});
            }

    console.log("DECODED TOKEN:", decoded); 
            req.user=decoded;
            next();
        });
    }
    module.exports=authmiddleware;