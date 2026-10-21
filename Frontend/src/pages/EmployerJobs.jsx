
import EmployerJobCard from "../Component/EmployerJobCard";
import { getEmployerJobs } from "../services/employerService";
import { useState, useEffect } from "react";
import "../Employer/employer.css";

function EmployerJobs() {
  const [employerJobs, setEmployerJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      const response = await getEmployerJobs();
      console.log(response.data);
      setEmployerJobs(response.data);
    }

    getJobs();
  }, []);

  return (
    <section className="employer-jobs">
      <header className="employer-jobs__header">
        <h1 className="employer-jobs__title">My Jobs</h1>
        <p className="employer-jobs__description">
          View all jobs you have posted.
        </p>
      </header>

      <div className="employer-jobs__list">
        {employerJobs.map((job) => {
          return (
            <EmployerJobCard
              key={job._id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              jobType={job.jobType}
              appliedAt={new Date(job.appliedAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              isActive={job.isActive}
              experienceRequired={job.experienceRequired}
            />
          );
        })}
      </div>
    </section>
  );
}

export default EmployerJobs;
