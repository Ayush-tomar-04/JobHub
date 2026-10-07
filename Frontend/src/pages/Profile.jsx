import { useEffect, useRef, useState } from "react"
import {getUserProfile} from "../services/authLogin"
import { uploadResume } from "../services/applicationService"

function Profile({jobs}){
 const inputref = useRef(null)
const [user , setUser] = useState(null)
    async function handleResume(e){
        if(e.target.files.length === 0){
            inputref.current.value = ""
            return alert("Please select required file")
        }
        const selectedFile = e.target.files[0]

        if(selectedFile.type!=="application/pdf"){
            inputref.current.value = ""
            return alert("Please select only required type file")
        }
        const maxSize = 5*1024*1024
        if(selectedFile.size>maxSize){
            inputref.current.value = ""
            return alert("File size must be 5 MB or less")
        }
        const formData = new FormData()
        formData.append("resume",selectedFile)
        console.log(formData)

        const response = await uploadResume(formData)
        setUser((previousUser)=>({
            ...previousUser,
            resume:response.data.resume

        }))

    }
    const savJob = jobs.filter((job)=>{
        return job.saved===true
    })
    const saveJob = savJob.length

    const filterJob = jobs.filter((job)=>{
        return job.applied===true
    })
    const applyJob = filterJob.length

    const totalJob = jobs.length


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
                    <h3>Resume:{user?.resume} </h3>
                    <a
                    href={`/uploads/${user?.resume}`}
                    target="_blank"
                    rel="noopener noreferrer">
                        View Resume
                    </a>
                    <input type="file"
                    accept="application/pdf"
                    ref={inputref}
                    onChange={handleResume}/>
                    

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