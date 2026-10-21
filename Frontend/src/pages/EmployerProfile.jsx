
import { useEffect, useState } from "react"
import { getEmployerProfile } from "../services/employerService";
import {
    UserRound,
    Mail,
    Phone,
    Building2,
    BadgeCheck,
    BriefcaseBusiness,
    IdCard
} from "lucide-react";
import "../Employer/employer.css"

const EmployerProfile = ()=>{
    
    const [profile , setProfile] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function showError(message){
        setError(message)
        setTimeout(()=>{
            setError("")
        },3000)
    }

    useEffect(()=>{async function getProfile(){
        try{
            showError("")
            setLoading(true)

            const response = await getEmployerProfile()
            if(response?.success===true){
                setProfile(response.data)
            }
            else{
                showError("Unable to Fetch Profile. Please try again")
            }

        }
        catch(err){
            showError(err.response?.data?.message || "Unable to Fetch Profile. Please try again")
        }
        finally{
            setLoading(false)
        }
    }
    getProfile()
  },[])
   console.log(profile)

  return(
    <section className="employer-profile">
        <header className="employer-profile__header">
            <div>
                <h1 className="employer-profile__title">
                    <UserRound size={24} />
                    Employer Profile
                </h1>
                <p className="employer-profile__description">
                    View your personal and employment information.
                </p>
            </div>

            <div className="employer-profile__header-icon">
                <UserRound size={25} />
            </div>
        </header>

        {
            loading ? (
                <div className="employer-profile__message">
                    <p>Employer details fetching...</p>
                </div>
            ) : error ? (
                <div className="employer-profile__error">
                    <p>{error}</p>
                </div>
            ) : profile === null ? (
                <div className="employer-profile__empty">
                    <div className="employer-profile__empty-icon">
                        <UserRound size={30} />
                    </div>
                    <h2>Employer profile not found.</h2>
                    <p>Your profile information is not available right now.</p>
                </div>
            ) : (
                <div className="employer-profile__card">
                    <div className="employer-profile__identity">
                        <div className="employer-profile__avatar">
                            <UserRound size={32} />
                        </div>

                        <div className="employer-profile__identity-info">
                            <h2 className="employer-profile__name">
                                {profile.name}
                            </h2>
                            <p className="employer-profile__email">
                                <Mail size={16} />
                                {profile.email}
                            </p>
                        </div>

                        <span className="employer-profile__role">
                            <BriefcaseBusiness size={15} />
                            {profile.role}
                        </span>
                    </div>

                    <div className="employer-profile__divider"></div>

                    <div className="employer-profile__details">
                        <div className="employer-profile__detail">
                            <div className="employer-profile__detail-icon">
                                <IdCard size={19} />
                            </div>
                            <div className="employer-profile__detail-content">
                                <h3>Employer ID</h3>
                                <p>{profile.empId}</p>
                            </div>
                        </div>

                        <div className="employer-profile__detail">
                            <div className="employer-profile__detail-icon">
                                <Phone size={19} />
                            </div>
                            <div className="employer-profile__detail-content">
                                <h3>Phone</h3>
                                <p>{profile.phone}</p>
                            </div>
                        </div>

                        <div className="employer-profile__detail">
                            <div className="employer-profile__detail-icon">
                                <Building2 size={19} />
                            </div>
                            <div className="employer-profile__detail-content">
                                <h3>Company Name</h3>
                                <p>{profile.companyId?.name || "Not available"}</p>
                            </div>
                        </div>

                        <div className="employer-profile__detail">
                            <div className="employer-profile__detail-icon">
                                <BadgeCheck size={19} />
                            </div>
                            <div className="employer-profile__detail-content">
                                <h3>Company Status</h3>
                                <p>{profile.companyStatus}</p>
                            </div>
                        </div>

                        <div className="employer-profile__detail employer-profile__detail--email">
                            <div className="employer-profile__detail-icon">
                                <Mail size={19} />
                            </div>
                            <div className="employer-profile__detail-content">
                                <h3>Email Address</h3>
                                <p>{profile.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    </section>
  )
}

export default EmployerProfile
