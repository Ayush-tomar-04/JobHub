
import { useState } from "react"
import { userLogin } from "../services/authLogin"
import { useNavigate } from "react-router-dom"
import { employerLogin } from "../services/employerAuth"
import { jwtDecode } from "jwt-decode"
import { BriefcaseBusiness, UserRound, Building2, Mail, LockKeyhole, LogIn } from "lucide-react"
import "../Employer/employer.css"

function Login({isAuthenticated,setIsAuthenticated}){
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [role , setRole] = useState("user")
    const [errorMessage, setErrorMessage] = useState("")

    async function handleLogin(e){
        e.preventDefault()
        setErrorMessage("")
        try{
            if(role==="user"){
                const response = await userLogin(email,password)
                if(response?.success===true){
                    localStorage.removeItem("EmployerToken");
                    localStorage.setItem("token", response.token);
                    setEmail("")
                    setPassword("")
                    setIsAuthenticated(true)

                    alert("login successfully")
                    navigate("/")
                }
                else{
                    setErrorMessage(response?.data.message || "Login Failed")
                }
            }
            else if(role === "employer"){
                const response = await employerLogin(email,password)

                if(response?.success===true){
                    localStorage.removeItem("token");
                    localStorage.setItem("EmployerToken",response.token)
                    setEmail("")
                    setPassword("")
                    setIsAuthenticated(true)

                    alert("login successfully")
                    navigate("/employer")
                }
                else{
                    setErrorMessage(response?.data?.message || "Login Failed")
                }
            }
        }
        catch(err){
            setErrorMessage(err.response?.data?.message || "Login Failed")
        }
    }

    const navigate = useNavigate()

    return(
        <main className="auth-page">
            <div className="auth-container">

                <div className="auth-brand">
                    <div className="auth-brand__icon">
                        <BriefcaseBusiness size={25} />
                    </div>
                    <span>JobHub</span>
                </div>

                <div className="auth-heading">
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue your JobHub journey.</p>
                </div>

                {errorMessage && (
                    <div className="auth-error" role="alert">
                        {errorMessage}
                    </div>
                )}

                <div className="auth-role-selector">
                    <button
                        className={`auth-role-button ${role === "user" ? "auth-role-button--active" : ""}`}
                        type="button"
                        aria-pressed={role === "user"}
                        onClick={() => {setRole("user"); console.log("Btn click")}}
                    >
                        <UserRound size={18} />
                        User
                    </button>

                    <button
                        className={`auth-role-button ${role === "employer" ? "auth-role-button--active" : ""}`}
                        type="button"
                        aria-pressed={role === "employer"}
                        onClick={() => {setRole("employer"); console.log("employer btn click")}}
                    >
                        <Building2 size={18} />
                        Employer
                    </button>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>

                    <div className="auth-field">
                        <label htmlFor="login-email">Email Address</label>
                        <div className="auth-input-wrapper">
                            <Mail size={18} />
                            <input
                                id="login-email"
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e)=>{
                                    setEmail(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="login-password">Password</label>
                        <div className="auth-input-wrapper">
                            <LockKeyhole size={18} />
                            <input
                                id="login-password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e)=>{
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                    </div>

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        <LogIn size={18} />
                        Login as {role === "user" ? "User" : "Employer"}
                    </button>

                    <div className="auth-register">
                        <span>Don't have an account?</span>
                        <button
                            className="auth-secondary"
                            type="button"
                            onClick={()=>navigate("/signup")}
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                <p className="auth-footer">
                    Find opportunities. Build your future.
                </p>

            </div>
        </main>
    )
}

export default Login
