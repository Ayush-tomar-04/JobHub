
import { useEffect, useState } from "react";
import { deactivateJobs, getEmployerJobs } from "../services/employerService";
import MangeJobCard from "../Component/ManageJobCard";
import { useNavigate } from "react-router-dom";
import { Plus, BriefcaseBusiness } from "lucide-react";
import "../Employer/employer.css";

function ManageJobs() {
  const navigate = useNavigate();
  const [employerJobs, setEmployerJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function showError(message) {
    setError(message);
    setTimeout(() => setError(""), 3000);
  }

  async function handleEdit(jobId) {
    navigate(`/employer/jobs/${jobId}/edit`);
    console.log("btn click:", jobId);
  }

  async function handleDeactivate(jobId) {
    try {
      setError("");

      const response = await deactivateJobs(jobId);

      if (response?.success === true) {
        setEmployerJobs((prevJobs) => {
          return prevJobs.map((job) => {
            if (jobId === job._id) {
              return {
                ...job,
                isActive: false,
              };
            }
            return job;
          });
        });
      } else {
        showError("Job Deactivation Failed");
      }
    } catch (err) {
      showError(
        err.response?.data?.message || "Unable to deactivate job"
      );
    }
  }

  useEffect(() => {
    async function fetchJobs() {
      try {
        setError("");
        setLoading(true);

        const response = await getEmployerJobs();

        if (response?.success === true) {
          setEmployerJobs(response.data);
        } else {
          showError("Unable to load employer jobs");
        }
      } catch (err) {
        showError(
          err.response?.data?.message || "Unable to load employer jobs"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  console.log(employerJobs);

  return (
    <section className="manage-jobs">
      {error && (
        <div className="manage-jobs__error" role="alert">
          {error}
        </div>
      )}

      <header className="manage-jobs__header">
        <div className="manage-jobs__heading">
          <h1 className="manage-jobs__title">Manage Jobs</h1>
          <p className="manage-jobs__description">
            Manage your job postings, update details, and control job availability.
          </p>
        </div>

        {!loading && employerJobs.length > 0 && (
          <button
            type="button"
            className="manage-jobs__create-button"
            onClick={() => navigate("/employer/create-job")}
          >
            <Plus size={18} aria-hidden="true" />
            Create Job
          </button>
        )}
      </header>

      {loading ? (
        <p className="manage-jobs__loading">Jobs are fetching...</p>
      ) : employerJobs.length === 0 ? (
        <div className="manage-jobs__empty">
          <div className="manage-jobs__empty-icon">
            <BriefcaseBusiness size={32} aria-hidden="true" />
          </div>

          <h2 className="manage-jobs__empty-title">No Jobs Found</h2>

          <p className="manage-jobs__empty-description">
            You haven't created any job postings yet. Create your first job to
            start attracting qualified candidates.
          </p>

          <button
            type="button"
            className="manage-jobs__create-button"
            onClick={() => navigate("/employer/create-job")}
          >
            <Plus size={18} aria-hidden="true" />
            Create Your First Job
          </button>
        </div>
      ) : (
        <div className="manage-jobs__list">
          {employerJobs.map((job) => {
            return (
              <MangeJobCard
                key={job._id}
                jobId={job._id}
                title={job.title}
                location={job.location}
                jobType={job.jobType}
                experienceRequired={job.experienceRequired}
                salary={job.salary}
                isActive={job.isActive}
                date={job.appliedAt}
                handleDeactivate={handleDeactivate}
                handleEdit={handleEdit}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default ManageJobs;
