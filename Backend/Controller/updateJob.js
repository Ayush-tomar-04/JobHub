









const Job = require("../Models/jobs")

exports.updateJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId
        const data = req.body;

        const employerId = req.user.userId;

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"job does not exist"
            })
        }
        if(!job.employerId.equals(employerId)){
            return res.status(403).json({
                success:false,
                message:"This employer not allow to update job"
            })
        }
        const {title,description,location,salary,requirements,experienceRequired,jobType} = req.body;
        const updateData = {
            title,description,location,salary,requirements,experienceRequired,jobType
        };
        const response = await Job.findByIdAndUpdate(jobId,updateData)

        res.status(200).json({
            success:true,
            data:response,
            message:"successfully Updated"
        })
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success:false,
            date:null,
            message:err.message
        })
    }
}