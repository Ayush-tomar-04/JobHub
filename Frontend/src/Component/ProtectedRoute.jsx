import { Navigate,Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode"

export function ProtectedRoute({children,requiredRole}){
    const token =
  requiredRole === "employer"
    ? localStorage.getItem("EmployerToken")
    : localStorage.getItem("token");
    if(!token){
       return <Navigate to="/login"/>
    }
     const decodedToken = jwtDecode(token)
     if(decodedToken.role!==requiredRole){
        return <Navigate to="/login"/>
     }
    
    
    return children

  

}
