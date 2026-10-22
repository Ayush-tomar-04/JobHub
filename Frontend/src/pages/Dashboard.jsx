import Statcard from "../Component/Statcard"
import JobCard from "../Component/Jobcard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserProfile } from "../services/authLogin";

function Dashboard({input,jobs,setJobs,activities,setActivities, handleapply,handleSave, error , setError,fetchJobs,savingJobId, handleUnsaved,unsavingJobId,handleJobDetails}){
    const totaljob = jobs.length;
    const appliedjob = jobs.filter((job) => job.applied === true).length
    const profilecompleted = 100

    const [localError , setLocalError] = useState("")
    const [loading , setLoading] = useState(true)

    function showError(message){
        setLocalError(message)
        setTimeout(()=>{
            setLocalError("")
        },3000)
    }
    
    const [userProfile , setUserProfile] = useState("")

                const filterjob = jobs.filter((job)=>{
                    return job.title.toLowerCase().includes(input.toLowerCase())
                })
                
        
               useEffect(()=>{async function getUser(){
                  try{
                    showError("")
                    setLoading(true)
                    const response = await getUserProfile()
                    if(response?.success===true){
                        setUserProfile(response.data)
                    }
                    else{
                        showError("Unable to fetch user profile please try again.")
                    }
                  }
                  catch(err){
                    showError(err.response?.data?.message || "Unable to fetch user profile please try again.")
                  }
                  finally{
                    setLoading(false)
                  }
               }
            getUser()
            },[])
               
            
            

                const filtersave = jobs.filter((job)=>{
                      return job.saved === true
                   })
                  const savedjob = filtersave.length

               
               
                

                   
   return(
    <>
        <div className="dashboard-layout">
            {localError && <p>{localError}</p>}
            {loading ? (
                <p>Loading profile...</p>
            ) : (
                <h2>👋 Welcome {userProfile.name}</h2>
            )}


            <div className="statistics-grid">
               <Statcard
               icon="📊"
               title="Total Job"
               value={totaljob}
               />

               <Statcard
                icon="❤️"
                title="Saved Jobs"
                value={savedjob}
                />

                <Statcard
                    icon="📄"
                    title="Applied Jobs"
                    value={appliedjob}
                />

               <Statcard
                icon="👤"
                title="Profile Completed"
                value={profilecompleted}
               />
            </div>

            <div className="dashboard-section">

                <div className="recent-job">

                    <h2 className="section-title">💼 Recent Jobs</h2>

                     {error && (
                        <div className="job-error">
                            <p className="job-error-message">
                                ⚠️ {error}
                            </p>

                            <button
                                className="retry-btn"
                                onClick={fetchJobs}
                            >
                                Retry
                            </button>
                        </div>
                    )}
                    

                    <div className="job-list">
                   
                    {
                    filterjob.map((job)=>{
                        return <JobCard
                        handleapply={handleapply}
                        handleSave={handleSave}
                        handleUnsaved={handleUnsaved}
                        handleJobDetails={handleJobDetails}
                        key={job.id}
                        jobId={job.id}
                        logo={job.logo}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        salary={job.salary}
                        jobType={job.jobType}
                        experienceRequired={job.experienceRequired}
                        applied={job.applied}
                        saved={job.saved}
                        saving ={savingJobId===job.id}
                        unsaving={unsavingJobId === job.id}
                        mode="dashboard"
                        />
                    })}
                    </div>

                </div>

                <div className="recent-acitivity">

                    <h2 className="section-title">📜 Recent Activity</h2>

                    <div className="activity-list">

                    {
                        activities.map((activity) => {

                            if (activity.action === "applied") {
                            return (
                                <h2
                                className="activity-item"
                                key={activity.id}
                                >
                                Applied for {activity.title} at {activity.company}
                                </h2>
                            );
                            }

                            else if(activity.action==="saved"){
                                return(
                                    <h2
                                    className="activity-item"
                                    key={activity.id}
                                    >
                                    Saved {activity.title} at {activity.company}
                                    </h2>
                                );
                            }

                            else if(activity.action==="unsaved"){
                                return(
                                    <h2
                                    className="activity-item"
                                    key={activity.id}
                                    >
                                        Removed {activity.title} from {activity.company}
                                    </h2>
                                );
                            }

                        })
                    }

                    </div>

                </div>

            </div>

        </div>

    </>
)
}
export default Dashboard