const express = require("express")

const route = express.Router()
const upload = require("../middleware/multer")

route.post("/user/resume",upload.single("resume"), (req,res)=>{
    console.log("FILE SIZE:", req.file?.size)
    res.json({
        success:true,
        message:"Resume upload succesfully"
    })
    console.log(req.file)
})
route.use((err,req,res,next)=>{
    
    if(err.code === "LIMIT_FILE_SIZE"){
        return res.status(400).json({
            success:false,
            message:"File size must be 5 MB or less"
        })
    }
    next(err)
})
module.exports = route