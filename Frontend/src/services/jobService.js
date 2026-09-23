import axios from "axios"

export const getJobs = async()=>{
    try{
    const response = await axios.get("/api/v1/jobs")
   
    return response.data
   
    }
    catch(err){
       console.log(err)
       throw err
    }
}