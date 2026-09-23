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

        const page = Number(req.query.page || 1)
        const limit = Number(req.query.limit || 10)
        if(limit>50 || limit<=0 ){
            return res.status(400).json({
                success:false,
                message:"Limit must be in valid range "
            })
        }

        const skip = (page-1)*limit

        const totalJobs = await jobs.countDocuments(filter)
        const totalPages = Math.ceil(totalJobs/limit)
        const response = await jobs
                              .find(filter)
                              .limit(limit)
                              .skip(skip)
                              .populate("companyId","name")
        res.status(200).json({
            success:true,
            data:response,
            pagination:{
              page,
              limit,
              totalJobs,
              totalPages
            },
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