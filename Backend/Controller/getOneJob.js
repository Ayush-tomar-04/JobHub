















const oneJob = require("../Models/jobs")

exports.getOneJob = async(req,res)=>{
    try{
        const jobId = req.params.jobId;
        const response = await oneJob.findOne({_id:jobId,isActive:true});

        if(!response){
            res.status(404).json({
                success:false,
                data:null,
                message:"No Job found"
            })
        }
        else{

        res.status(200).json({
            success:true,
            data:response,
            message:"successfully fetch"
        })

    }
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