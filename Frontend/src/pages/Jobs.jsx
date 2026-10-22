import { useState } from "react"
import JobCard from "../Component/Jobcard"

function Job({ jobs , setJobs,error,setError,fetchJobs,handleapply,handleSave,savingJobId, handleUnsaved,unsavingJobId,handleJobDetails}){
    

    
    return(
          
        <div className="job-page">

            <div className="job-page-header">

                <h2 className="job-page-title">
                    💼 Job Management
                </h2>
            {error&& (
                <div className="job-error">
                        
                            <>
                            <p className="job-error-message">
                            ⚠️ {error}
                            </p>
                             <button className="retry-btn" onClick={fetchJobs}>Retry</button>
                            </>
                        
                        </div>
                        )}
                
            
            </div>

          

            <div className="job-page-list">

                {

                jobs.map((job)=>{

                    return(

                        <JobCard

                       

                        key={job.id}

                        jobId={job.id}

                        logo={job.logo}

                        title={job.title}

                        company={job.company}

                        location={job.location}

                        salary={job.salary}

                        jobType={job.jobType}
                        applied={job.applied}
                        saved={job.saved}
                        experienceRequired={job.experienceRequired}
                        appliedAt = {job.appliedAt
                        ? new Date(job.appliedAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            })
                        : "N/A"}
                        handleapply={handleapply}
                        handleSave={handleSave}
                        saving ={savingJobId===job.id}
                        handleUnsaved={handleUnsaved}
                        unsaving={unsavingJobId === job.id}
                        handleJobDetails={handleJobDetails}

                        mode="job"

                        />

                    )

                })

                }

            </div>

        </div>

    )

}

export default Job;