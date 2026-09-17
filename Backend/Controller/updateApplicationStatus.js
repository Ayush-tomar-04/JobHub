const Application = require("../Models/application")
const Job = require("../Models/jobs")

exports.updateApplicationStatus = async(req,res)=>{
    try{
        const applicationId = req.params.applicationId

        const application = await Application.findById(applicationId)
        if(!application){
            return res.status(404).json({
                success:false,
                data:null,
                message:"Application not found"
            })
        }
        const jobId =  application.jobId
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                data:null,
                message:"Job not found"
            })
        }

        const employerId = req.user.userId;
        if(!job.employerId.equals(employerId)){
            return res.status(403).json({
                success:false,
                message:"Unauthorized employer"
            })
        }
        const {status} = req.body
        const updateData = {status}
        
        const allowedStatus = [
            "pending",
            "reviewing",
            "shortlisted",
            "rejected",
            "accepted"
        ]

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                success:false,
                data:null,
                message:"Invalid application status"
            })
        }
        const response = await Application.findByIdAndUpdate(applicationId,updateData,{new:true,runValidators:true})

        res.status(200).json({
            success:true,
            data:response,
            message:"Application status updated successfully"
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:"Unable to update the status"
        })
    }
}