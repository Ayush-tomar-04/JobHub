import { NavLink } from "react-router-dom"
import JobCard from "../Component/Jobcard"
import { withdrawApplication } from "../services/applicationService"


function AppliedJob({jobs , setJobs,applicationStatus,appliedAt}){

    const applyJob = jobs.filter((job)=>{
        return job.applied == true
    })

    if(applyJob.length === 0){
        console.log("No Applied Job ")
    }
    async function handlerWithdraw(applicationId) {
        const response = await withdrawApplication(applicationId)
       const updateWithdraw = jobs.map((job)=>{
        if(applicationId === job.applicationId){
            return{
                ...job,
                status:"withdrawn"
            }
        }
        return job
    })
    if(response?.success===true){
    setJobs(updateWithdraw)
    }
}

    return(

        <div className="applied-page">

            <h2 className="applied-title">
                📄 Applied Jobs
            </h2>

            {

                applyJob.length === 0 ?

                <div className="applied-empty">

                    <h2 className="applied-empty-title">
                        📄 No applied jobs yet.
                    </h2>

                    <NavLink
                    className="applied-empty-link"
                    to="/"
                    >
                        Go to Dashboard and apply for a job.
                    </NavLink>

                </div>

                :

                <div className="applied-job-list">
      
                    {

                    applyJob.map((job)=>{

                        return(

                            <JobCard

                                key={job.id}
                                id={job.id}
                                logo={job.logo}
                                title={job.title}
                                company={job.company}
                                location={job.location}
                                salary={job.salary}
                                jobType={job.jobType}
                                experienceRequired={job.experienceRequired}
                                mode="applied"
                                status={job.status}
                                appliedAt={job.appliedAt}
                                applicationId = {job.applicationId}
                                handlerWithdraw = {handlerWithdraw}
                            />
                              
                        )
                        

                    })
                    

                    }
                </div>

            }
            

        </div>

    )
}

export default AppliedJob