import axios from "axios"

export const userSignup = async(name,email,phone,password,skills,education)=>{
    try{
    const response = await axios.post("/api/v1/user",{name,email,phone,password,skills,education,resume: "resume.pdf"})
    return response.data
    }
    catch(err){
        console.log(err.response?.data)
        throw err
    }
}

export const userLogin = async(email,password)=>{
    try{
        const response = await axios.post("/api/v1/user/login",{email,password})

        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }
}


export const getUserProfile = async()=>{
    try{
        const response = await axios.get("/api/v1/user/userProfile")
        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }
}


