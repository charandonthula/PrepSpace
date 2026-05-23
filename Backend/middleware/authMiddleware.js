const jwt=require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    try{
        const token = req.header("Authorization");
        if(!token){
            return res.status(401).json({
                message:"Access denied"
            });
        }
        //const verifiedToken= jwt.verify(token,"secretkey");
        const verifiedToken= jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifiedToken;
        next();
    }catch (error){
        console.log(error);
        res.status(401).json({
            message: "Invalid token"
        });
    }
};
module.exports=authMiddleware;