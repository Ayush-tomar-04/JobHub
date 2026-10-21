




const application = require("../Models/application")
const User = require("../Models/userSchema")
exports.getUserApplication = async(req,res)=>{
    try{
        const userId = req.user.userId;
        
        const user = await User.findById(userId)
    
        
        const response = await application.find({userId:userId})
        res.status(200).json({
            success:true,
            data:response,
            message:"found successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}