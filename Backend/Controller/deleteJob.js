









const Job = require("../Models/jobs")

exports.deleteJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId;
        const employerId = req.user.userId;

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not exist"
            })
        }
        if(!job.employerId.equals(employerId)){
             return res.status(403).json({
                success:false,
                message:"Job not exist to this employer"
            })
        }
        const response = await Job.findByIdAndDelete(jobId)

        res.status(200).json({
            success:true,
            data:response,
            message:"successfully deleted"
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