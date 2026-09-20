










const { default: mongoose } = require("mongoose")
const application = require("../Models/application")
const Job = require("../Models/jobs")

exports.createApplication = async(req,res)=>{
    try{
        const userId = req.user.userId
        if(!userId){
            return res.status(401).json({
                success:false,
                message:"Authentication failed"
            })
        }
        const {jobId} = req.body
        if(!jobId || !mongoose.Types.ObjectId.isValid(jobId)){
            return res.status(400).json({
                success:false,
                message: "Invalid jobId"
            })
        }
        const job = await Job.findById(jobId)

        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            })
        }
        const existUserId = await application.findOne({userId:userId,jobId: jobId})
        if(existUserId){
            return res.status(409).json({
                success:false,
                message:"this job you already applied"
            })
        }
        if(job.isActive !== true){
            return res.status(400).json({
                success:false,
                message:"this job is deactived"
            })
        }
        const response = await application.create({userId, jobId, status:"pending"})

        res.status(201).json({
            success:true,
            data:response,
            message:"application created succesfully "
        })

    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:"Application not created"
        })
    }
}