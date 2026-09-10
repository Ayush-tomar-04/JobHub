const jobs = require("../Models/jobs")

exports.createJob = async(req,res)=>{
    try{
        const{employerId,companyId,title,description,location,salary,requirements,experienceRequired,jobType} = req.body;

        const response = await jobs.create({employerId,companyId,title,description,location,salary,requirements,experienceRequired,jobType})

        res.status(201).json({
            success:true,
            data:response,
            message:"Job created successfully"
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