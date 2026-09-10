const company = require("../Models/company")

exports.createCompany = async(req,res)=>{
    try{
        const{name, logo, description, website, location, employeeSize, foundedYear} = req.body;

        const response = await company.create({name, logo, description, website, location, employeeSize, foundedYear})

        res.status(201).json({
            success:true,
            data:response,
            message:"succesfull created company"
        })
    }
    catch(err){
        console.log(err)

        res.status(500).json({
            success:false,
            data:null,
            message:err.message
        })
    }
}