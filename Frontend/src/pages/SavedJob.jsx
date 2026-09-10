import { NavLink } from "react-router-dom"
import JobCard from "../Component/Jobcard"

function SavedJob({jobs,setJobs}){

    const saveJob = jobs.filter((job)=>{
        return job.saved === true
    })

    function handleUnsaveJob(id){

         const newJob = jobs.map((job)=>{

            if(job.id===id){

                return{

                    ...job,
                    saved:false

                }

            }

            return job

         })

         setJobs(newJob)

    }

    return(

        <div className="saved-page">

            <h2 className="saved-title">
                ❤️ Saved Jobs
            </h2>

            {

                saveJob.length === 0 ?

                <div className="saved-empty">

                    <h2 className="saved-empty-title">
                        ❤️ No saved jobs yet.
                    </h2>

                    <NavLink
                    className="saved-empty-link"
                    to="/"
                    >
                        Go to Dashboard and save jobs.
                    </NavLink>

                </div>

                :

                <div className="saved-job-list">

                    {

                    saveJob.map((job)=>{

                        return(

                            <JobCard

                            handleUnsaveJob={handleUnsaveJob}

                            key={job.id}

                            id={job.id}

                            logo={job.logo}

                            title={job.title}

                            company={job.company}

                            location={job.location}

                            salary={job.salary}

                            mode="saved"

                            status="Saved"

                            />

                        )

                    })

                    }

                </div>

            }

        </div>

    )

}

export default SavedJob;