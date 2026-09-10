







const jwt = require("jsonwebtoken");
exports. auth = async(req,res,next) =>{
    const header = req.headers.authorization
    try{
    const token = header.split(" ")[1]

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
         next()
    }
    catch(err){
        res.status(401).json({
            success:false,
            message:err.message
        })

    }
}
//module.exports = auth;