






const employer = require("../Models/employer")
const Company = require("../Models/company")
const bcrypt = require("bcrypt")

exports.signup = async(req,res)=>{
    try{
        const{name, email, phone, password, companyId} = req.body;

        if(!name || !email || !phone || !password || !companyId){
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
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company Not Found"
            })
        }
    
        const hashPassword = await bcrypt.hash(password,10)
        const response = await employer.create({name, email, phone, password:hashPassword , companyId,role:"employer",companyStatus: "pending"})

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
