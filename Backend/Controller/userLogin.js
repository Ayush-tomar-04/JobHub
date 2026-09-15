








const User = require("../Models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.userLogin = async(req,res)=>{
  try{
    const{email,password} = req.body;
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const response = await bcrypt.compare(password,user.password)

    if(!response){
        return res.status(401).json({
            success:false,
            message:"Password is Incorrect "
        })
    }
    const token = jwt.sign(
        {
            userId:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"10d"}
    )

    res.status(200).json({
        success:true,
        token:token,
        message:"User login successfully"
    })

    }
    catch(err){
        res.status(500).json({
        success:false,
        data:null,
        message:"Invalid Creditional"
    })
    }
}