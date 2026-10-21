
import { userSignup } from "../services/authLogin";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { employerSignup, createCompany } from "../services/employerAuth";
import {
    BriefcaseBusiness,
    UserRound,
    Building2,
    Mail,
    Phone,
    LockKeyhole,
    GraduationCap,
    CodeXml,
    MapPin,
    Globe,
    Users,
    CalendarDays,
    IdCard,
    UserPlus
} from "lucide-react";

function Signup(){
    const [name , setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [password , setPassword] = useState("");
    const [skillInput , setSkillInput] = useState("");
    const [educationInput , setEductationInput] = useState("");
    const [companyId , setCompanyId] = useState("");
    const [role , setRole] = useState("user");
    const [companyAction , setCompanyAction] = useState("");

    const [companyName , setCompanyName] = useState("");
    const [description, setDescription] = useState("");
    const [ website, setWebsite] = useState("");
    const [location , setLocation] = useState("");
    const [employeeSize, setEmployeeSize] = useState("");
    const [foundedyear , setFoundedYear] = useState("");

    const navigate = useNavigate();

    async function handleSignup(e){
        e.preventDefault();

        const skills = skillInput.split(",").map(skill => skill.trim()).filter(Boolean);
        const education = educationInput.split(",").map(item => item.trim()).filter(Boolean);

        try{
            if(role === "user"){
                const response = await userSignup(name, email, phone, password, skills, education);

                if (response?.success === true){
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPassword("");
                    setSkillInput("");
                    setEductationInput("");

                    alert("Signup Successfully");
                    navigate("/login");
                }
            }
            else if(role==="employer" && companyAction==="existing"){
                const response = await employerSignup(name, email, phone, password, companyId);

                if (response?.success === true){
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPassword("");
                    setCompanyId("");
                    alert("Signup Successfully");
                    navigate("/login");
                }
            }
            else if(role === "employer" && companyAction==="new"){
                const compnayResponse = await createCompany(companyName, description, website, location, Number(employeeSize), Number(foundedyear));

                if(compnayResponse.success!==true){
                    throw new Error(
                        compnayResponse?.message || "Company creation failed"
                    );
                }

                const newCompanyId = compnayResponse?.data?._id || compnayResponse?.data?.company?._id;

                if(!newCompanyId){
                    throw new Error(
                        "Company created, but company ID was not returned."
                    );
                }

                const response = await employerSignup(name, email, phone, password, newCompanyId);

                if (response?.success === true && compnayResponse?.success===true){
                    setName("");
                    setEmail("");
                    setPhone("");
                    setPassword("");
                    setCompanyName("");
                    setDescription("");
                    setWebsite("");
                    setLocation("");
                    setEmployeeSize("");
                    setFoundedYear("");
                    alert("Signup Successfully");
                    navigate("/login");
                }
            }
            else{
                alert("Please choose a company option.");
            }
        } catch (err){
            console.log("Signup error response:", err.response?.data);
            console.error("Signup failed", err);
        }
    }

    return(
        <main className="auth-page auth-page--signup">
            <div className="auth-container auth-container--signup">

                <div className="auth-brand">
                    <div className="auth-brand__icon">
                        <BriefcaseBusiness size={25} />
                    </div>
                    <span>JobHub</span>
                </div>

                <header className="auth-heading">
                    <h1>Create Your Account</h1>
                    <p>Join JobHub and take the next step in your career.</p>
                </header>

                <div className="auth-role-selector">
                    <button
                        className={`auth-role-button ${role === "user" ? "auth-role-button--active" : ""}`}
                        type="button"
                        aria-pressed={role === "user"}
                        onClick={()=>setRole("user")}
                    >
                        <UserRound size={18} />
                        Job Seeker
                    </button>

                    <button
                        className={`auth-role-button ${role === "employer" ? "auth-role-button--active" : ""}`}
                        type="button"
                        aria-pressed={role === "employer"}
                        onClick={()=>setRole("employer")}
                    >
                        <Building2 size={18} />
                        Employer
                    </button>
                </div>

                <form className="auth-form auth-form--signup" onSubmit={handleSignup}>

                    <div className="auth-field">
                        <label htmlFor="signup-name">Full Name</label>
                        <div className="auth-input-wrapper">
                            <UserRound size={18} />
                            <input
                                id="signup-name"
                                className="auth-input"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="signup-email">Email Address</label>
                        <div className="auth-input-wrapper">
                            <Mail size={18} />
                            <input
                                id="signup-email"
                                className="auth-input"
                                type="text"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="signup-phone">Phone Number</label>
                        <div className="auth-input-wrapper">
                            <Phone size={18} />
                            <input
                                id="signup-phone"
                                className="auth-input"
                                type="text"
                                placeholder="Enter your phone"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="signup-password">Password</label>
                        <div className="auth-input-wrapper">
                            <LockKeyhole size={18} />
                            <input
                                id="signup-password"
                                className="auth-input"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {role==="user" && (
                        <>
                            <div className="auth-field">
                                <label htmlFor="signup-skills">Skills</label>
                                <div className="auth-input-wrapper">
                                    <CodeXml size={18} />
                                    <input
                                        id="signup-skills"
                                        className="auth-input"
                                        type="text"
                                        placeholder="e.g. React, JavaScript, Node.js"
                                        value={skillInput}
                                        onChange={(e)=>setSkillInput(e.target.value)}
                                    />
                                </div>
                                <p className="auth-field__hint">Separate skills with commas.</p>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-education">Education</label>
                                <div className="auth-input-wrapper">
                                    <GraduationCap size={18} />
                                    <input
                                        id="signup-education"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter your education"
                                        value={educationInput}
                                        onChange={(e)=>setEductationInput(e.target.value)}
                                    />
                                </div>
                                <p className="auth-field__hint">Separate entries with commas.</p>
                            </div>
                        </>
                    )}

                    {role==="employer" && (
                        <div className="auth-field">
                            <label htmlFor="signup-company-action">Company Registration</label>
                            <div className="auth-input-wrapper">
                                <Building2 size={18} />
                                <select
                                    id="signup-company-action"
                                    className="auth-input auth-select"
                                    value={companyAction}
                                    onChange={(e)=>setCompanyAction(e.target.value)}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="existing">Join Existing Company</option>
                                    <option value="new">Register New Company</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {role==="employer" && companyAction==="existing" && (
                        <div className="auth-field">
                            <label htmlFor="signup-company-id">Company ID</label>
                            <div className="auth-input-wrapper">
                                <IdCard size={18} />
                                <input
                                    id="signup-company-id"
                                    className="auth-input"
                                    type="text"
                                    placeholder="Enter your company ID"
                                    value={companyId}
                                    onChange={(e)=>setCompanyId(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {role==="employer" && companyAction==="new" && (
                        <section className="signup-company-section">
                            <div className="signup-company-section__heading">
                                <Building2 size={20} />
                                <div>
                                    <h2>Company Information</h2>
                                    <p>Enter your company details.</p>
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-company-name">Company Name</label>
                                <div className="auth-input-wrapper">
                                    <Building2 size={18} />
                                    <input
                                        id="signup-company-name"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter company name"
                                        value={companyName}
                                        onChange={(e)=>setCompanyName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-company-description">Description</label>
                                <div className="auth-input-wrapper">
                                    <CodeXml size={18} />
                                    <input
                                        id="signup-company-description"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter company description"
                                        value={description}
                                        onChange={(e)=>setDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-company-website">Website</label>
                                <div className="auth-input-wrapper">
                                    <Globe size={18} />
                                    <input
                                        id="signup-company-website"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter company website"
                                        value={website}
                                        onChange={(e)=>setWebsite(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-company-location">Location</label>
                                <div className="auth-input-wrapper">
                                    <MapPin size={18} />
                                    <input
                                        id="signup-company-location"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter company location"
                                        value={location}
                                        onChange={(e)=>setLocation(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-employee-size">Employee Size</label>
                                <div className="auth-input-wrapper">
                                    <Users size={18} />
                                    <input
                                        id="signup-employee-size"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter employee size"
                                        value={employeeSize}
                                        onChange={(e)=>setEmployeeSize(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label htmlFor="signup-founded-year">Founded Year</label>
                                <div className="auth-input-wrapper">
                                    <CalendarDays size={18} />
                                    <input
                                        id="signup-founded-year"
                                        className="auth-input"
                                        type="text"
                                        placeholder="Enter founded year"
                                        value={foundedyear}
                                        onChange={(e)=>setFoundedYear(e.target.value)}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    <button
                        className="auth-submit"
                        type="submit"
                    >
                        <UserPlus size={18} />
                        Create Account
                    </button>

                    <div className="auth-register">
                        <span>Already have an account?</span>
                        <button
                            className="auth-secondary"
                            type="button"
                            onClick={()=>navigate("/login")}
                        >
                            Login
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

export default Signup
