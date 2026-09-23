import axios from "axios"

export const userLogin = async(email,password)=>{
    console.log("btn clicked")
    try{
        const response = await axios.post("/api/v1/user/login",{email,password})

        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }
}