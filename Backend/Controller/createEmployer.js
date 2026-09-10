const employer = require("../Models/employer")

exports.createEmployer = async(req,res)=>{
    try{
        const{empId,name,email,phone,password,companyId} = req.body;

        const response = await employer.create({empId,name,email,phone,password,companyId})

        res.status(201).json({
            success:true,
            data:response,
            message:"Employer create successfully"
        })
    }
    catch(err){
        console.log(err)

        res.status(404).json({
            success:false,
            data:null,
            message:err.message
        })
    }
}