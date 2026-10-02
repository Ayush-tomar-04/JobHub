const Savejob = require("../Models/saveJob")

exports.getSavedJobs = async(req,res)=>{
    try{
        const userId = req.user.userId

        const savejob = await Savejob.find({userId})
       
        const response = savejob
        res.status(200).json({
            success:true,
            data:response,
            message:"Successfully found save job"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            data:null,
            message:"Something Wrong Please Try Again"
        })
    }
}