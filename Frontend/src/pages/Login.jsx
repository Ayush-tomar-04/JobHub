import { useState } from "react"
import {userLogin} from "../services/authLogin"

function Login(){
const [email , setEmail] = useState("")
const [password , setPassword]  = useState("")
async function handleLogin(e){
    e.preventDefault()
    const response = await userLogin(email,password)
    localStorage.setItem("token",response.token)

    
}
    return(
        <div>
            <form onSubmit={handleLogin}>
            <input type="text" placeholder="Enter you email"
             value={email}
             onChange={(e)=>{
                setEmail(e.target.value)
             }}
             />
            <input type="password" placeholder="Enter you password" 
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            <button>Login</button>
            </form>
        </div>
    )
}

export default Login