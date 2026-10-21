const Application = require("../Models/application")
const Job = require("../Models/jobs")

exports.getEmployerApplicationDetails = async(req,res)=>{
    try{
        const applicationId = req.params.applicationId
        if(!applicationId){
            return res.status(400).json({
                success:false,
                message:"Application Id Invalid"
            })
        }
        const application = await Application.findById(applicationId)
        if(!application){
            return res.status(404).json({
                success:false,
                data:null,
                message:"Application not found"
            })
        }
        const jobId = application.jobId
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                data:null,
                message:"Job not found"
            })
        }
        const employerId = req.user.userId
        if(!job.employerId.equals(employerId)){
            return res.status(403).json({
                success:false,
                message:"Unauthorized employer"
            })
        }
            await application.populate("userId", "name email phone resume skills education");
            await application.populate("jobId", "title");    
            const response = application;
                res.status(200).json({
                success:true,
                data:response,
                message:"Found Successfully"
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