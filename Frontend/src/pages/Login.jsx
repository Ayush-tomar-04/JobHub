import { useState } from "react"
import {userLogin} from "../services/authLogin"
import { useNavigate } from "react-router-dom"

function Login({isAuthenticated,setIsAuthenticated}){
const [email , setEmail] = useState("")
const [password , setPassword]  = useState("")

async function handleLogin(e){
    e.preventDefault()
    const response = await userLogin(email,password)
    localStorage.setItem("token",response.token)   
    
    if(response?.success===true){
        setEmail("")
        setPassword("")
        setIsAuthenticated(true)
        
        alert("login successfully")
        navigate("/")
    }
}

const navigate = useNavigate()

    return(
        <div className="auth-page">
            <div className="auth-container">

                <h1>Login</h1>
                <p>Welcome back to JobHub</p>

                <form className="auth-form" onSubmit={handleLogin}>

                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        Login
                    </button>

                    <button
                        className="auth-secondary"
                        type="button"
                        onClick={()=>navigate("/signup")}
                    >
                        Create Account
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Login

