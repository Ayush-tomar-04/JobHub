









const job = require("../Models/jobs")

exports.deleteJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId;

        const response = await job.findByIdAndDelete(jobId)

        res.status(200).json({
            success:true,
            date:response,
            message:"successfully deleted"
        })
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success:true,
            data:null,
            message:err.message
        })
    }
}