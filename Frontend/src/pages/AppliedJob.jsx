import { NavLink } from "react-router-dom"
import JobCard from "../Component/Jobcard"

function AppliedJob({jobs , setJobs}){

    const applyJob = jobs.filter((job)=>{
        return job.applied == true
    })

    if(applyJob.length === 0){
        console.log("No Applied Job ")
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
                                status="Applied"

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