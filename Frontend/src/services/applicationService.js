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

export const withdrawApplication = async(applicationId)=>{
    try{
        const response = await axios.patch(`/api/v1/applications/${applicationId}/withdraw`)
        return response.data
    }
    catch(err){
        throw err
    }
}
export const jobSave = async(jobId)=>{
    try{
        const response = await axios.post(`/api/v1/jobs/${jobId}/save`)
        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }

}

export const getSaveJob = async()=>{
    try{
        const response = await axios.get("/api/v1/saved-jobs")
        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }
}

export const removeSaveJob = async(jobId)=>{
    try{
        const response = await axios.delete(`/api/v1/jobs/${jobId}/unsave`)
        return response.data
    }
    catch(err){
        console.log(err)
        throw err
    }

}

