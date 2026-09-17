const Job = require("../Models/jobs")

exports.getEmployerJobs = async(req,res)=>{
    try{
        const employerId = req.user.userId

        const response = await Job.find({employerId:employerId})

        res.status(200).json({
            success:true,
            data:response,
            message:"found succesfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            data:null,
            message:"Failed to fetch employer jobs"
        })
    }

}