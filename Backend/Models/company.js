const mongoose = require("mongoose")

const company = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        logo:{
            type:String,
            required:true
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
        }
    }
);
module.exports = mongoose.model("company",company)