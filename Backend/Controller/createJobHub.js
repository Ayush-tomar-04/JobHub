const user = require("../Models/userSchema")
const bcrypt = require("bcrypt")
exports.createJobHub = async(req,res)=>{
    try{
        const{name,email,phone,password,resume,skills,education} = req.body;
        
        if(!name || !email || !phone || !password || !resume || !skills || !education){
            return res.status(400).json({
                success:false,
                data:null,
                message:"please enter a valid inputs"
            })
        }

        const existingEmail = await user.findOne({email:email});
        if(existingEmail){
            return res.status(409).json({
                success:false,
                message:"Email aready exist"
            })
        }
        const existingPhone = await user.findOne({phone:phone});
        if(existingPhone){
            return res.status(409).json({
                success:false,
                message:"Phone number aready exist"
            })
        }
        const hashPassword = await bcrypt.hash(password,10);

        const response = await user.create({name,email,phone,password:hashPassword,resume,skills,education,role:"user"});
         const safeResponse = response.toObject()
         delete safeResponse.password
        res.status(201).json({
            success:true,
            data:safeResponse,
            message:"user create Successfully"
        })
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success:false,
            data:null,
            message:err.message
        });
    }
};

