const mongoose = require("mongoose")

const jobs = new mongoose.Schema(
    {
        employerId:{
            type:mongoose.Types.ObjectId,
            ref:"employer",
            required:true
        },
        companyId:{
            type:mongoose.Types.ObjectId,
            ref:"company",
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        salary:{
            type:String,
            required:true
        },
        requirements:{
            type:Array,
            required:true
            
        },
        experienceRequired:{
             type:String,
            required:true
        },
        jobType:{
             type:String,
            required:true
        }
    }
);

module.exports = mongoose.model("jobs",jobs)