
const Application = require("../Models/application")
const Job = require("../Models/jobs")
const User = require("../Models/userSchema")
const mongoose = require("mongoose")
const path = require("node:path")
const fs = require("node:fs")

exports.getResume = async(req,res)=>{
    try{
        const applicationId = req.params.applicationId
        if(!applicationId || !mongoose.Types.ObjectId.isValid(applicationId)){
            return res.status(400).json({
                success:false,
                message:"Application Id is missing or Inavlid"
            })
        }
        const application = await Application.findById(applicationId)
        if(!application){
            return res.status(404).json({
                success:false,
                message:"Application not found"
            })
        }
        const jobId = application.jobId
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        const userId = application.userId
        const employerId = req.user.userId
        if(!job.employerId.equals(employerId)){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to access resume"
            })
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        const resume = user.resume
        console.log("Resume filename:", resume)
        if(!resume){
            return res.status(404).json({
                success:false,
                message:"resume not found"
            })
        }
       
        const uploadDir = path.resolve(__dirname,"../uploads")
        const filePath = path.resolve(uploadDir , resume)
        console.log("Uploads directory:", uploadDir)
console.log("Full file path:", filePath)
        if (!filePath.startsWith(uploadDir + path.sep)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid resume path"
                })
            }

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({
                    success: false,
                    message: "Resume file not found"
                })
            }
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader(
                "Content-Disposition",
                'inline; filename="resume.pdf"'
            )

            return res.sendFile(filePath)
    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:err.message
        })
    }
}