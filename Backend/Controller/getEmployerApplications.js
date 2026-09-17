








const Job = require("../Models/jobs")
const application = require("../Models/application")

exports.getEmployerApplications = async(req,res)=>{
    try{
        const employerId = req.user.userId

        const jobs = await Job.find({employerId})

        const jobId = jobs.map(job=>job._id)
        const response = await application.find({jobId:{$in:jobId}})

        res.status(200).json({
            success:true,
            data:response,
            message:"found successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:"Unable to found the application "
        })
    }
}