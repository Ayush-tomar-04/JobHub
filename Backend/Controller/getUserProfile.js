







const User = require("../Models/userSchema")

exports.userProfile = async(req,res)=>{
    try{
        const userId = req.user.userId
        if(!userId){
           return res.status(401).json({
                success:false,
                message:"Invalid authentication token"
            })
        }
        const user = await User.findById(userId).select("-password")
        if(!user){
           return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        res.status(200).json({
            success:true,
            data:user,
            message:"user found successfully"
        })
    }
    catch(err){
        res.status(500).json({
             success:false,
             data:null,
             message:"Failed to fetch user profile"
        })
    }
}