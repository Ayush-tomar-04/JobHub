const Application = require("../Models/application")
const mongoose = require("mongoose")

exports.withdrawApplication = async(req,res)=>{

    try{
        const userId = req.user.userId
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Authentication failed"
            })
        }
        const applicationId = req.params.applicationId
        if(!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)){
            return res.status(400).json({
                success:false,
                message:"Invalid ApplicationId"
            })
        }
        const application = await Application.findById(applicationId)
        if(!application){
           return res.status(404).json({
                success:false,
                message:"Application Not Found"
            })
        }
        if(userId !== application.userId.toString()){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to withdraw this application"
            })
        }
        if(application.status === "rejected" || application.status === "accepted" || application.status === "withdrawn"){
            return res.status(400).json({
                success:false,
                message:"Application is already conclude"
            })
        }
          const response = await Application.findByIdAndUpdate(applicationId, {status:"withdrawn"})

          res.status(200).json({
            success:true,
            data:response,
            message:"Successfuly Withdraw"
          })

    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:"Server error please try again"
        })
    }
}