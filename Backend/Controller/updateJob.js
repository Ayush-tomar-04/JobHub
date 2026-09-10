









const Job = require("../Models/jobs")

exports.updateJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId
        const data = req.body;

        const response = await Job.findByIdAndUpdate(jobId,data)

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