
import { useEffect, useState } from "react";
import { getEmployerApplications } from "../services/employerService";
import ApplicationStatcard from "../Component/ApplicationStatcard";
import EmployerApplicationCard from "../Component/EmployerApplicationCard";
import "../Employer/employer.css"

function EmployerApplications() {
  const [employerApplications, setEmployerApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("recent");

  const pendingStatus = employerApplications.filter((job) => {
    return job.status === "pending";
  });

  const shortlistingStatus = employerApplications.filter((job) => {
    return job.status === "shortlisted";
  });

  useEffect(() => {
    async function fetchApplication() {
      try {
        setLoading(true);
        setError("");
        const response = await getEmployerApplications();
        setEmployerApplications(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch applications"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchApplication();
  }, []);

  if (loading) {
    return (
      <section className="employer-applications">
        <p className="employer-applications__message">
          Loading applications...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="employer-applications">
        <p className="employer-applications__error" role="alert">
          {error}
        </p>
      </section>
    );
  }

  let sortedArray;

  if (sortOrder === "recent") {
    sortedArray = [...employerApplications].sort((a, b) => {
      return (
        new Date(b.appliedAt).getTime() -
        new Date(a.appliedAt).getTime()
      );
    });
  } else {
    sortedArray = [...employerApplications].sort((a, b) => {
      return (
        new Date(a.appliedAt).getTime() -
        new Date(b.appliedAt).getTime()
      );
    });
  }

  return (
    <section className="employer-applications">
      <header className="employer-applications__header">
        <div>
          <h1 className="employer-applications__title">
            Applications
          </h1>
          <p className="employer-applications__description">
            Review candidates who have applied for your jobs.
          </p>
        </div>
      </header>

      <div className="employer-applications__stats">
        <ApplicationStatcard
          title="Total Applications"
          value={employerApplications.length}
        />

        <ApplicationStatcard
          title="Pending Applications"
          value={pendingStatus.length}
        />

        <ApplicationStatcard
          title="Shortlisted"
          value={shortlistingStatus.length}
        />
      </div>

      {employerApplications.length === 0 ? (
        <div className="employer-applications__empty">
          <h2>No Applications Found</h2>
          <p>
            Applications will appear here when candidates apply for your jobs.
          </p>
        </div>
      ) : (
        <div className="employer-applications__content">
          <div className="employer-applications__list-header">
            <div>
              <h2 className="employer-applications__section-title">
                All Applications
              </h2>
              <p className="employer-applications__list-description">
                Review candidate profiles and application status.
              </p>
            </div>

            <div className="employer-applications__sort">
              <label htmlFor="application-sort">Sort by</label>
              <select
                id="application-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="recent">Recent First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="employer-applications__list">
            {sortedArray.map((job) => {
              return (
                <EmployerApplicationCard
                  key={job._id}
                  applicationId={job._id}
                  name={job?.userId?.name || "Applicant name"}
                  email={job?.userId?.email || "Applicant email"}
                  title={job?.jobId?.title}
                  resume={job?.userId?.resume || "Resume not available"}
                  status={job.status}
                  appliedAt={job.appliedAt}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

export default EmployerApplications;
