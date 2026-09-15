const mongoose = require("mongoose")

const user = new mongoose.Schema(
    {
        name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
        phone:{
        type:String,
        required:true,
        },
        password:{
            type:String,
            required:true
        },
        resume:{
            type:String,
            required:true
        },
        skills:{
            type:Array,
            required:true
        },
        education:{
            type:Array,
            required:true
        },
        role:{
            type:String,
            required:true,
            enum: ["user"]
        },
    }
);

module.exports = mongoose.model("userSchema",user)