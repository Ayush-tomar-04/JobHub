import axios from "axios"

export const applyToJob = async(jobId)=>{
    
    try{
        const response = await axios.post("/api/v1/application",{jobId})
        return response.data
    }
    catch(err){
         console.log(err)
        throw err
    }
}

export const getApplication = async()=>{
    try{
        const response = await axios.get("/api/v1/applications")
        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }
}

