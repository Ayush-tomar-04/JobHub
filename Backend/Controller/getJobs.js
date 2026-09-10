const jobs = require("../Models/jobs")

exports.getJobs = async(req,res)=>{
    try{
        const response = await jobs.find()

        res.status(200).json({
            success:true,
            data:response,
            message:"Jobs fin succesfully"
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