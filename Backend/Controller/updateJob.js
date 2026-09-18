









const Job = require("../Models/jobs")
const mongoose = require("mongoose")

exports.updateJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId
        if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
            return res.status(400).json({
                success:false,
                message:"Invalid jobId"
            })
        }
        const employerId = req.user.userId;

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                data:null,
                message:"job not found"
            })
        }
        if(!job.employerId.equals(employerId)){
            return res.status(403).json({
                success:false,
                message:"This employer not allow to update job"
            })
        }
        const allowedFields = ["title", "description", "location","salary", "requirements", "experienceRequired","jobType"]

        const requestFields = Object.keys(req.body)

        if(requestFields.length === 0){
            return res.status(400).json({
                success:false,
                data:null,
                message:"At least one field is required for update"
            })
        }
        const invalidFields = requestFields.filter((field)=>!allowedFields.includes(field))
        if(invalidFields.length>0){
            return res.status(400).json({
                success:false,
                data:null,
                message:"Invalid update fields"
    })
        }
        const updateData = {}

        allowedFields.forEach((field)=>{
            if(req.body[field] !== undefined){
                updateData[field] = req.body[field]
            }
        })
        const response = await Job.findByIdAndUpdate(jobId,{$set:updateData},{new:true,runValidators: true})

        res.status(200).json({
            success:true,
            data:response,
            message:"Job updated successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:err.message
        })
    }
}