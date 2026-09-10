const user = require("../Models/userSchema")

exports.createJobHub = async(req,res)=>{
    try{
        const{name,email,phone,password,resume,skills,education,role} = req.body;

        const response = await user.create({name,email,phone,password,resume,skills,education,role});

        res.status(201).json({
            success:true,
            data:response,
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

