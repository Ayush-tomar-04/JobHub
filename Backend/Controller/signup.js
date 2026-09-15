






const employer = require("../Models/employer")
const bcrypt = require("bcrypt")

exports.signup = async(req,res)=>{
    try{
        const{empId, name, email, phone, password, companyId} = req.body;

        if(!empId || !name || !email || !phone || !password || !companyId){
            return res.status(400).json({
                success:false,
                message:"Please Enter valid Input Field"
            })
        }
        const exintingEmail = await employer.findOne({email:email});
        if(exintingEmail){
            return res.status(409).json({
                success:false,
                message:"Email is already regiestered"
            })
        }
        const exitingEmpid = await employer.findOne({empId:empId})
        if(exitingEmpid){
            return res.status(409).json({
                success:false,
                message:"EmpId is already regiestered"
            })
        }
        const hashPassword = await bcrypt.hash(password,10)
        const response = await employer.create({empId, name, email, phone, password:hashPassword , companyId,role:"employer"})

        const safeResponse = response.toObject()
        delete safeResponse.password
        res.status(201).json({
            success:true,
            data:safeResponse,
            message:"Employee Signup Successfully"
        });

    }
    catch(err){
        res.status(500).json({
            success:false,
            data:err.message,
            message:"Failed"
        })
    }
}
