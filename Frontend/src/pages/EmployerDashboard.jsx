import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  ArrowRight,
  UserRound,
} from "lucide-react";

import EmployerStatcard from "../Component/EmployerStatcard";
import RecentApplicationsCard from "../Component/RecentApplicationsCard";

import {
  getEmployerApplications,
  getEmployerJobs,
  getEmployerProfile,
} from "../services/employerService";

import "../Employer/employer.css";

function EmployerDashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [application, setApplication] = useState([]);
  const [profile, setProfile] = useState(null);

  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  function showError(message) {
    setError(message);

    setTimeout(() => {
      setError("");
    }, 3000);
  }

  useEffect(() => {
    async function getJobs() {
      try {
        showError("");
        setloading(true);

        const applicationResponse = await getEmployerApplications();

        if (applicationResponse?.success === true) {
          setApplication(applicationResponse?.data);
        }

        const profileResponse = await getEmployerProfile();

        if (profileResponse?.success === true) {
          setProfile(profileResponse?.data);
        }

        const response = await getEmployerJobs();

        if (response?.success === true) {
          setJobs(response?.data);
        } else {
          showError("Unable to fetch jobs. Please try again.");
        }
      } catch (err) {
        showError(
          err.response?.data?.message ||
            "Unable to fetch jobs. Please try again."
        );
      } finally {
        setloading(false);
      }
    }

    getJobs();
  }, []);

  const activeJobs = jobs.filter((job) => job.isActive === true);

  const sortedApplications = [...application].sort((a, b) => {
    return new Date(b.appliedAt) - new Date(a.appliedAt);
  });

  return (
    <section className="employer-dashboard">
      {error && (
        <p className="employer-dashboard__error" role="alert">
          {error}
        </p>
      )}

      {loading && (
        <p className="employer-dashboard__loading">
          Fetching dashboard details...
        </p>
      )}

      <header className="employer-dashboard__header">
        <div className="employer-dashboard__heading">
          <h1 className="employer-dashboard__title">
            Employer Dashboard
          </h1>

          <h2 className="employer-dashboard__welcome">
            <UserRound size={20} aria-hidden="true" />
            <span>Welcome, {profile?.name || "Employer"}</span>
          </h2>
        </div>
      </header>

      <div className="employer-dashboard__stats">
        <EmployerStatcard
          icon={<BriefcaseBusiness size={22} />}
          title="Total Jobs"
          value={jobs.length}
        />

        <EmployerStatcard
          icon={<CheckCircle2 size={22} />}
          title="Active Jobs"
          value={activeJobs.length}
        />

        <EmployerStatcard
          icon={<FileText size={22} />}
          title="Applications"
          value={application.length}
        />
      </div>

      <section className="employer-dashboard__recent">
        <header className="employer-dashboard__recent-header">
          <div>
            <h2 className="employer-dashboard__section-title">
              Recent Applications
            </h2>

            <p className="employer-dashboard__section-description">
              Latest applications received
            </p>
          </div>

          <button
            type="button"
            className="employer-dashboard__view-all"
            onClick={() => navigate("/employer/applications")}
          >
            View all
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </header>

        <div className="employer-dashboard__application-list">
          {!loading && sortedApplications.length === 0 && (
            <p className="employer-dashboard__empty">
              No applications received yet.
            </p>
          )}

          {sortedApplications.slice(0, 5).map((application) => (
            <RecentApplicationsCard
              key={application._id}
              name={application.userId?.name}
              title={application.jobId?.title}
              appliedAt={application.appliedAt}
              status={application.status}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default EmployerDashboard;