import { useParams } from "react-router-dom";

function JobDetails({jobs,handleapply}){

    const {id} = useParams()

    const job = jobs.find(job=>job.id===id)
    if (!job) {
    return <p>Job not found</p>
}

async function submitApplication(){
      handleapply(job.id)
}
   return (
    <div>
         <h3>{job.title}</h3>
         <h3>{job.company}</h3>
         <p>📍Location: {job.location}</p>
         <p>💰Salary: {job.salary} LPA</p>
         <p>💼JobType: {job.jobType}</p>
         <p>🧑‍💻Experince:{job.experienceRequired}</p>

         <p>Description:{job.description}</p>

         <h3>Requirements</h3>
         <ul>
            {
                job.requirements.map((requirement)=>{
               return <li key={requirement}>{requirement}</li>
            })
            }
         </ul>
         {!job.applied ?(
            <button onClick={submitApplication}>Apply</button>
          ) : (
            <button disabled>Applied</button>
          )
         }
         <button>Save</button>
    </div>
   )
}

export default JobDetails
