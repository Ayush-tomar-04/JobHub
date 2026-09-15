




exports.userAuth = (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({
            success:false,
            message:"Authentication required"
        })
    }
    if(req.user.role==="user"){
        next()
    }
    else{
        res.status(403).json({
            success:false,
            message:"User is not authorized"
        })
    }

}