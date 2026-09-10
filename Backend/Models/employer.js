const mongoose = require("mongoose");
const company = require("./company");

const employer = new mongoose.Schema(
    {
        empId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        companyId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"company",
            required:true
        }
    }
);

module.exports = mongoose.model("employer",employer)