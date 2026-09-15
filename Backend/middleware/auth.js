







const jwt = require("jsonwebtoken");
exports. auth = (req,res,next) =>{
    const header = req.headers.authorization

    if(!header){
        return res.status(401).json({
            success:false,
            data:null,
            message:"Authorization header is required"
        })
    }
    try{
        const parts = header.split(" ")
        if(parts[0]!=="Bearer" || !parts[1]){
            return res.status(401).json({
                success:false,
                message:"Invalid authorization header"
            })
        }
    const token = parts[1]

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
         next()
    }
    catch(err){
        res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })

    }
}
//module.exports = auth;