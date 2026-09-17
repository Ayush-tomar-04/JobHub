



const mongoose = require("mongoose")

const application = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"userSchema",
            required:true
        },
        jobId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"jobs",
            required:true
        },
        status:{
            type:String,
            required:true,
            enum:["pending","reviewing","shortlisted", "rejected","accepted"]
        },
        appliedAt: {
        type: Date,
        default: Date.now
        }

    }
)

module.exports = mongoose.model("application",application)