import { userSignup } from "../services/authLogin"; 
import {useState} from "react" 
import { useNavigate } from "react-router-dom"; 
 
function Signup(){ 
    const [name , setName] = useState("") 
    const [email,setEmail] = useState("") 
    const [phone , setPhone] = useState("") 
    const [password , setPassword] = useState("") 
    const [skillInput , setSkillInput] = useState("") 
    const [educationInput , setEductationInput] = useState("") 
      
    const navigate = useNavigate() 
     
    async function handleSignup(e){ 
        e.preventDefault() 
 
        const skills = skillInput.split(",").map(skill => skill.trim()).filter(Boolean) 
        const education = educationInput.split(",").map(item => item.trim()).filter(Boolean) 
 
        try { 
            const response = await userSignup(name, email, phone, password, skills, education) 
 
            if (response?.success === true) { 
            setName("") 
            setEmail("") 
            setPhone("") 
            setPassword("") 
            setSkillInput("") 
            setEductationInput("") 
 
            alert("Signup Successfully") 
            navigate("/login") 
            } 
        } catch (error) { 
            // userSignup logs the server's error response; keep the entered form values. 
            console.error("Signup failed", error) 
        } 
    } 
 
 
return ( 
    <div className="auth-page"> 
        <div className="auth-container">

            <form className="auth-form" onSubmit={handleSignup}> 
                <input 
                    className="auth-input"
                    type="text" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e)=> 
                    setName(e.target.value) 
                    }
                />

                <input 
                    className="auth-input"
                    type="text" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e)=>{ 
                        setEmail(e.target.value) 
                    }}
                />

                <input 
                    className="auth-input"
                    type="text" 
                    placeholder="Enter your phone" 
                    value={phone} 
                    onChange={(e)=>{ 
                        setPhone(e.target.value) 
                    }}
                />

                <input 
                    className="auth-input"
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e)=>{ 
                        setPassword(e.target.value) 
                    }}
                />

                <input 
                    className="auth-input"
                    type="text" 
                    placeholder="Enter your skills" 
                    value={skillInput} 
                    onChange={(e)=>{ 
                        setSkillInput(e.target.value) 
                    }}
                />

                <input 
                    className="auth-input"
                    type="text" 
                    placeholder="Enter your education" 
                    value={educationInput} 
                    onChange={(e)=>{ 
                        setEductationInput(e.target.value) 
                    }}
                />

                <button 
                    className="auth-submit"
                    type="submit"
                >
                    Signup
                </button>

                <button 
                    className="auth-secondary"
                    type="button" 
                    onClick={()=>navigate("/login")} 
                >
                    Already have an account? Login
                </button>
            </form> 
 
        </div>
    </div>
) 
} 

export default Signup

