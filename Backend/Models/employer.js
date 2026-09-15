const mongoose = require("mongoose");

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
        },
        role:{
            type:String,
            required:true,
            enum:["employer"]
        }
    }
);

module.exports = mongoose.model("employer",employer)