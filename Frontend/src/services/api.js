import axios from "axios"

axios.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")
        if(token){
        const header = `Bearer ${token}`
        config.headers.Authorization = header
        return config
    }
}
    
)