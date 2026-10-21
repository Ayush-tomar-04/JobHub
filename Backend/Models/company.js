const mongoose = require("mongoose")

const company = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        logo:{
            type:String,
           
        },
        description:{
            type:String,
            required:true
        },
        website:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        employeeSize:{
            type:Number,
            required:true
        },
        foundedYear:{
            type:Number,
            required:true
        },
        ownerEmpId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"employer",
        }
    }
);
module.exports = mongoose.model("company",company)