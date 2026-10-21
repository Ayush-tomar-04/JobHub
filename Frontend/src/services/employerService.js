import axios from "axios";

export const getEmployerJobs = async()=>{
    try{
        const response = await axios.get("/api/v1/employer/jobs")
        return response.data
    }
    catch(err){
        throw err
    }

}

export const getEmployerApplications = async()=>{
    try{
        const response = await axios.get("/api/v1/employer/applications")
        return response.data
    }
    catch(err){
        throw err
    }
}

export const getEmployerApplicationDetails = async(applicationId) =>{
    try{
        const response =  await axios.get(`/api/v1/employer/applications/${applicationId}`)
        console.log("Application details response:", response);
        return response.data
    }
    catch(err){
          throw err

    }
}
export const getResume = async(applicationId)=>{
    try{
        const response = await axios.get(`/api/v1/employer/applications/${applicationId}/resume`,{
            responseType:"blob"
        })
        return response.data
    }
    catch(err){
        throw err
    }
}
  
export const postJobs = async(jobData)=>{
    try{
        const response = await axios.post("/api/v1/jobs",jobData)
        return response.data
    }
    catch(err){
        throw err
    }
}
export const deactivateJobs = async(jobId)=>{
    try{
        const response = await axios.delete(`/api/v1/deleteJob/${jobId}`)
        return response.data
    }
    catch(err){
        throw err
    }
}
export const getOneJob = async (jobId) => {
    try {
        const response = await axios.get(`/api/v1/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching job:", error.response?.data || error.message);
        throw error;
    }
};

export const updateJob = async(jobId,formData)=>{
    try{
        const response = await axios.patch(`/api/v1/updateJob/${jobId}`,formData)
        return response.data
    }
    catch(err){
        throw err
    }
}

export const getEmployerProfile = async () => {
    
    try{
    const response = await axios.get("/api/v1/employer/profile");
    return response.data;
    }
    catch(err){
        throw err
    }
};

export const updateApplicationStatus=async(applicationId,status)=>{
    try{
        const response = await axios.patch(`/api/v1/applications/${applicationId}/status`,{status})
        return response.data
    }
    catch(err){
        throw err
    }
}
