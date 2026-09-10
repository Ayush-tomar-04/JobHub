




const employer = require("../Models/employer");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async(req,res)=>{
    try{
        const{email,password} = req.body;

        const userExist = await employer.findOne({email:email})
        if(!userExist){
            return res.status(409).json({
                success:false,
                message:"User not Exist"
            })
        }
        const response = await bcrypt.compare(password,userExist.password)
        if(!response){
            return res.status(409).json({
                success:false,
                message:"password Incorrect"
            })
           
        }
        const token = jwt.sign(
            {userId:userExist._id,role:"employer"},
            process.env.JWT_SECRET,
            {expiresIn:"10d"}
        );
        res.status(200).json({
            success:true,
            token:token,
            message:"user login successfully"
        })
    }
    catch(err){
          res.status(500).json({
                success:false,
                message:"User login failed"
            })
    }
}