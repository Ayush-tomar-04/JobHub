import { useEffect, useState } from "react"
import {getUserProfile} from "../services/authLogin"

function Profile({jobs}){

    const savJob = jobs.filter((job)=>{
        return job.saved===true
    })
    const saveJob = savJob.length

    const filterJob = jobs.filter((job)=>{
        return job.applied===true
    })
    const applyJob = filterJob.length

    const totalJob = jobs.length

    const [user , setUser] = useState(null)

    useEffect(()=>{
        async function profile(){

        const response = await getUserProfile()
        const data = {
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            resume: response.data.resume,
            skills: response.data.skills,
            education: response.data.education
        }
        setUser(data)

    }
    profile()
},[])

    return(
        <div className="profile-page">

            <h2 className="profile-heading">
                👤 My Profile
            </h2>

            <div className="profile-card">

                

                <div className="profile-info">

                    <h2 className="profile-name">
                        Name: {user?.name}
                    </h2>

                    <h2 className="profile-email">
                        Email: {user?.email}
                    </h2>

                   <h2 className="profile-location">
                        Skills: {user?.skills?.join(",")}
                    </h2>
                    <h2 className="profile-phone">
                        phone:{user?.phone}
                    </h2>
                    <h2 className="profile-education">
                        education:{user?.education}
                    </h2>
                    

                </div>

            </div>

            <div className="profile-statistics">

                <h2 className="profile-stat-heading">
                    📊 Statistics
                </h2>

                <h2 className="profile-stat-item">
                    ❤️ Saved Jobs : {saveJob}
                </h2>

                <h2 className="profile-stat-item">
                    📄 Applied Jobs : {applyJob}
                </h2>

                <h2 className="profile-stat-item">
                    📈 Total Jobs : {totalJob}
                </h2>

                <h2 className="profile-stat-item">
                    🏆 Profile Completion : 100%
                </h2>

            </div>

        </div>
    )
}

export default Profile;