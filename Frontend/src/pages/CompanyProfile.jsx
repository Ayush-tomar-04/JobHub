
import { useEffect, useState } from "react";
import { getEmployerProfile } from "../services/employerService";
import {
    Building2,
    MapPin,
    Globe,
    Users,
    CalendarDays,
    FileText,
    ShieldCheck,
    AlertCircle,
    LoaderCircle
} from "lucide-react";
import "../Employer/employer.css"
const CompanyProfile = () => {
    const [company, setCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function showError(message){
        setError(message)
        setTimeout(()=>{
            setError("")
        },3000)
    }

    useEffect(()=>{async function getCompany(){
        try{
            showError("")
            setLoading(true)
            console.log("getCompany executed");
            const response = await getEmployerProfile()
              if(response?.success === true){
                setCompany(response.data)
              }
              else{
                showError("Company Details Not Found Something Wrong. Please Try Again")
              }
        }
        catch(err){
            showError(err.response?.data?.message || "Company Details Not Found Something Wrong. Please Try Again")
        }
        finally{
            setLoading(false)
        }

    }
    getCompany()

    },[])

    return (
        <section className="employer-company-profile">
            <header className="employer-company-profile__header">
                <div>
                    <h1 className="employer-company-profile__title">
                        Company Profile
                    </h1>
                    <p className="employer-company-profile__description">
                        View your company information and business details.
                    </p>
                </div>

                <div className="employer-company-profile__header-icon">
                    <Building2 size={25} />
                </div>
            </header>

            {error && (
                <p className="employer-company-profile__error">
                    <AlertCircle size={18} />
                    {error}
                </p>
            )}

            {loading && (
                <p className="employer-company-profile__loading">
                    <LoaderCircle size={18} className="employer-company-profile__spinner" />
                    Company details fetching...
                </p>
            )}

            {!loading && (
                <>
                    {company.length === 0 ?
                        <div className="employer-company-profile__empty">
                            <div className="employer-company-profile__empty-icon">
                                <Building2 size={30} />
                            </div>
                            <h2>There is No Company Details</h2>
                            <p>Company information is not available right now.</p>
                        </div>
                        :
                        <div className="employer-company-profile__content">
                            <div className="employer-company-profile__identity">
                                <div className="employer-company-profile__company-icon">
                                    <Building2 size={32} />
                                </div>

                                <div className="employer-company-profile__identity-info">
                                    <h2 className="employer-company-profile__company-name">
                                        {company.companyId.name}
                                    </h2>
                                    <p className="employer-company-profile__location">
                                        <MapPin size={16} />
                                        {company.companyId.location}
                                    </p>
                                </div>

                                <span className="employer-company-profile__status">
                                    <ShieldCheck size={15} />
                                    {company.companyStatus}
                                </span>
                            </div>

                            <div className="employer-company-profile__divider"></div>

                            <div className="employer-company-profile__details">
                                <div className="employer-company-profile__detail employer-company-profile__detail--description">
                                    <div className="employer-company-profile__detail-icon">
                                        <FileText size={19} />
                                    </div>
                                    <div>
                                        <h3>Description</h3>
                                        <p>{company.companyId.description}</p>
                                    </div>
                                </div>

                                <div className="employer-company-profile__detail">
                                    <div className="employer-company-profile__detail-icon">
                                        <Globe size={19} />
                                    </div>
                                    <div>
                                        <h3>Company Website</h3>
                                        <p>{company.companyId.website}</p>
                                    </div>
                                </div>

                                <div className="employer-company-profile__detail">
                                    <div className="employer-company-profile__detail-icon">
                                        <Users size={19} />
                                    </div>
                                    <div>
                                        <h3>Company Size</h3>
                                        <p>{company.companyId.employeeSize}</p>
                                    </div>
                                </div>

                                <div className="employer-company-profile__detail">
                                    <div className="employer-company-profile__detail-icon">
                                        <CalendarDays size={19} />
                                    </div>
                                    <div>
                                        <h3>Founded Year</h3>
                                        <p>{company.companyId.foundedYear}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </>
            )}
        </section>
    )
}

export default CompanyProfile;
