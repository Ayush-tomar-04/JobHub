import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"

function JobHubLayout({input , setInput , isAuthenticated , setIsAuthenticated}){
    
    return(
        <>
            <Navbar input={input} 
            setInput={setInput} 
            isAuthenticated = {isAuthenticated} 
            setIsAuthenticated={setIsAuthenticated}/>

           <div className="layout">
              <Sidebar />
              <Outlet />
           </div>
        </>
    )
}
export default JobHubLayout