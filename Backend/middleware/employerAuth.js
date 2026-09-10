







exports.employerAuth = (req,res,next)=>{
    if(req.user.role==="employer"){
        next()
    }
    else{
        res.status(403).json({
            success:false,
            message:"User is not authorized"
        })
    }
}