import Statcard from "../Component/Statcard"
import JobCard from "../Component/Jobcard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({input,jobs,setJobs,activities,setActivities, handleapply}){
    const totaljob = jobs.length;
    const appliedjob = jobs.filter((job) => job.applied === true).length
    const profilecompleted = 100   
                
                const filterjob = jobs.filter((job)=>{
                    return job.title.toLowerCase().includes(input.toLowerCase())
                })
                
        
               
               
                function handleSave(id){
                  
                   const updateSave = jobs.map((job)=>{
                   if(job.id===id){
                    return{
                        ...job,
                        saved:true
                    }
                   }
                   return job
                   })
                   setJobs(updateSave)
                   const saveActivity = jobs.find((job)=>{
                     return job.id === id
                   })
                   const newSaveactivity = {
                    id:saveActivity.id,
                    title:saveActivity.title,
                    company:saveActivity.company,
                    action:"saved"
                   }
                   setActivities([newSaveactivity,...activities])
                }

                const filtersave = jobs.filter((job)=>{
                      return job.saved === true
                   })
                  const savedjob = filtersave.length

                function handleUnsaved(id){
                    
                    const updateUnsave = jobs.map((job)=>{
                        if(job.id===id){
                            return{
                                ...job,
                                saved:false
                            }
                        }
                        return job
                    })
                    setJobs(updateUnsave)

                    const unsaveactivity = jobs.find((job)=>{
                        return job.id===id
                    })
                      const newUnsaveactivity={
                         id:unsaveactivity.id,
                         title:unsaveactivity.title,
                         company:unsaveactivity.company,
                         action:"unsaved",
                         time:Date.now()
                      }
                      setActivities([newUnsaveactivity,...activities])
                }
                const navigate = useNavigate()
                function handleJobDetails(id){
                       navigate(`/jobs/${id}`)
                }

               
                

                   
   return(
    <>
       
        <div className="dashboard-layout">

            <h2 className="dashboard-title">👋 Welcome Vishu</h2>


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

                    <div className="job-list">
                    {
                    filterjob.map((job)=>{
                        return <JobCard
                        handleapply={handleapply}
                        handleSave={handleSave}
                        handleUnsaved={handleUnsaved}
                        handleJobDetails={handleJobDetails}
                        key={job.id}
                        id={job.id}
                        logo={job.logo}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        salary={job.salary}
                        jobType={job.jobType}
                        experienceRequired={job.experienceRequired}
                        applied={job.applied}
                        saved={job.saved}
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