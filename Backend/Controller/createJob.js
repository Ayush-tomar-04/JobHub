const jobs = require("../Models/jobs")
const Employer = require("../Models/employer");

exports.createJob = async(req,res)=>{
    try{
        const{title,description,location,salary,requirements,experienceRequired,jobType} = req.body;
        if (!title || !description || !location || !salary || !requirements || !experienceRequired || !jobType) {
            return res.status(400).json({
            success: false,
            data: null,
            message: "All fields are required"
    });
}
        if(typeof title !== "string" || typeof description !== "string" || typeof location !== "string" || typeof salary !== "string" || typeof experienceRequired !== "string" || typeof jobType !== "string" ||!Array.isArray(requirements) ){
             return res.status(400).json({
            success: false,
            data: null,
            message: "All fields must be correct"
    });
        }
        if (
            title.trim().length === 0 ||
            description.trim().length === 0 ||
            location.trim().length === 0
        ) {
    return res.status(400).json({
        success: false,
        data: null,
        message: "Title, description and location cannot be empty"
    });
}
        if (
    requirements.length === 0 ||
    !requirements.every(function (item) {
        return typeof item === "string" && item.trim().length > 0;
    })
) {
    return res.status(400).json({
        success: false,
        data: null,
        message: "Requirements must contain at least one non-empty string"
    });
}
        const employerId = req.user.userId;
        const employer = await Employer.findById(req.user.userId)
        if(!employer){
           return res.status(404).json({
                success:false,
                message:"Employer not found"
            })
        }
        const companyId = employer.companyId
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