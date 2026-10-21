import axios  from "axios";

export const employerLogin = async(email,password)=>{
    try{
        const response = await axios.post("/api/v1/login",{email,password})
        return response.data
    }
    catch(err){
        throw err
    }
}

export const employerSignup = async(name,email,phone,password,companyId)=>{
    try{
        const response = await axios.post("/api/v1/signup",{name,email,phone,password,companyId})
        return response.data
    }
    catch(err){
        throw err
    }
}
export const createCompany = async(companyName, description, website, location, employeeSize, foundedYear)=>{
    try{
        const response = await axios.post("/api/v1/company",{name:companyName, description, website, location, employeeSize, foundedYear})
        return response.data
    }
    catch(err){
        throw err
    }
}