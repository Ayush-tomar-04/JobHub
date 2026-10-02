const SaveJob = require("../Models/saveJob")
const Job = require("../Models/jobs")
const mongoose = require("mongoose")

exports.createSavedJob = async(req,res)=>{
    try{
        const userId = req.user.userId
         if(!userId){
            return res.status(401).json({
                success:false,
                message:"Authentication failed"
            })
        }
        const jobId = req.params.jobId
         if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
                return res.status(400).json({
                    success:false,
                    message:"Invalid jobId"
                })
            }
            const job = await Job.findById(jobId)
            if(!job){
                return res.status(404).json({
                    success:false,
                    message:"Job not Found"
                })
            }
            const savedJob = await SaveJob.findOne({
                userId,
                jobId
            })
            if(savedJob){
                return res.status(400).json({
                    success:false,
                    message:"This job is already saved"
                })
            }
            const response = await SaveJob.create({userId,jobId})
            res.status(201).json({
                success:true,
                data:response,
                message:"job successfully saved"
            })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            data:null,
            message:err.message
        })
    }
}


exports.removeSaveJob = async(req,res)=>{
    try{
        const userId = req.user.userId

        const jobId = req.params.jobId

        if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
            return res.status(400).json({
                success:false,
                message:"Invalid jobId"
            })
        }
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        const saveJob = await SaveJob.findOne({userId,jobId})
        if(!saveJob){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        const response = await SaveJob.findByIdAndDelete(saveJob._id)
        return res.status(200).json({
            success:true,
            data:response,
            message:"Successfully deleted"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            data:null,
            message:"Something went wrong please try again"
        })
    }
}