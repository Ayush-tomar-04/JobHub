









const Job = require("../Models/jobs")
const mongoose = require("mongoose")

exports.deleteJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId;
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
                message:"Job not found"
            })
        }
        if(!job.employerId.equals(employerId)){
             return res.status(403).json({
                success:false,
                message:"Job not exist to this employer"
            })
        }

        const response = await Job.findByIdAndUpdate(jobId,{$set :{isActive:false}},{new:true})

        res.status(200).json({
            success:true,
            data:response,
            message:"Job deactivated successfully"
        })
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success:false,
            data:null,
            message:"Unable to deactivate job"
        })
    }
}