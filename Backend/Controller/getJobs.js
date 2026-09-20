const jobs = require("../Models/jobs")

exports.getJobs = async(req,res)=>{
    try{
        const search = req.query.search

        const filter = {
            isActive:true
        }

        if(search){
            filter.$or = [
                {title:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}},
                {location:{$regex:search,$options:"i"}}
            ]
        }
        const location  = req.query.location
        if(location){
            filter.location = {$regex:location,$options:"i"}
        }
        const jobType = req.query.jobType
        if(jobType){
            filter.jobType = jobType
        }
        const experienceRequired = req.query.experienceRequired
        if(experienceRequired){
            filter.experienceRequired = experienceRequired
        }
        const salary = req.query.salary
        if(salary){
            filter.salary = {$gte:Number(salary)}
        }

        const response = await jobs.find(filter)
           

        res.status(200).json({
            success:true,
            data:response,
            message:"Jobs fetched successfully"
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