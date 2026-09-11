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
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        location:{
            type:String,
            required:true,
            trim:true
        },
        salary:{
            type:String,
            required:true,
            match: /^[0-9]+(\.[0-9]+)? LPA$/,
            trim:true
        },
        requirements:{
            type:[String],
            required:true,
            validate:{
                validator: function(value){
                    return value.length>=1 &&
                        value.every(function(item){
                            return typeof item === "string" && item.trim().length>0;
                    });
                },
                message:"At least one requirement is required"
            }
            
        },
    experienceRequired: {
        type: String,
        required: true,
        trim: true,
        enum: ["0-2 years", "2-4 years", "4-6 years", "6+ years"]
},
        jobType:{
             type:String,
            required:true,
            trim:true,
            enum: ["Full-time", "Part-time", "Internship", "Contract"]
        }
    }
);

module.exports = mongoose.model("jobs",jobs)