const User = require("../Models/userSchema")

exports.uploadResume = async(req,res)=>{
    try{
        const userId = req.user.userId

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a resume"
            })
        }

      const user = await User.findById(userId)
      if(!user){
         return res.status(404).json({
                success:false,
                message:"User not found"
            })
      }
      
     const response = await User.findByIdAndUpdate(
            userId,
            { resume: req.file.filename },
            { new: true }
        )

        res.status(200).json({
            success: true,
            data: {
                resume: response.resume
            },
            message: "Resume uploaded successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}