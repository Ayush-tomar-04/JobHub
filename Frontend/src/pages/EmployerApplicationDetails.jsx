
import { useEffect, useState } from "react";
import { getEmployerApplicationDetails, getResume } from "../services/employerService";
import { NavLink, useParams } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  CodeXml,
  FileText,
  ArrowLeft,
} from "lucide-react";
import "../Employer/employer.css"
import { updateApplicationStatus } from "../services/employerService";

function EmployerApplicationDetails() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("")
  const { applicationId } = useParams();

  const handleStatusUpdate = async () => {
  if (!applicationId || !selectedStatus) {
    setError("Application ID and status are required.");
    return;
  }

  try {
    setError("");

    const response = await updateApplicationStatus(
      applicationId,
      selectedStatus
    );

    if (response?.success === true) {
      setApplication(response.data);
      setSelectedStatus(response.data.status);
    } else {
      setError(response?.message || "Unable to update application status.");
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Unable to update application status."
    );
  }
};
  const handleViewResume = async () => {
    const newTab = window.open("", "_blank");

    if (!newTab) {
      setError("Please allow pop-ups to view the resume");
      return;
    }

    try {
      const blob = await getResume(applicationId);
      const fileUrl = URL.createObjectURL(blob);
      newTab.location.href = fileUrl;
    } catch (err) {
      newTab.close();
      setError(
        err.response?.data?.message || "Failed to open resume"
      );
    }
  };

  useEffect(() => {
    async function getApplicationDetails(applicationId) {
      if (!applicationId) {
        setError("Application Id Required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const response = await getEmployerApplicationDetails(applicationId);
        setApplication(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to Fetch The Job Details"
        );
      } finally {
        setLoading(false);
      }
    }

    getApplicationDetails(applicationId);
  }, [applicationId]);

  if (loading) {
    return (
      <section className="employer-application-details">
        <p className="employer-application-details__message">
          Loading application details...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="employer-application-details">
        <p className="employer-application-details__error" role="alert">
          {error}
        </p>
        <NavLink
          className="employer-application-details__back"
          to="/employer/applications"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to Applications
        </NavLink>
      </section>
    );
  }

  return (
    <section className="employer-application-details">
      <NavLink
        className="employer-application-details__back"
        to="/employer/applications"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        Back to Applications
      </NavLink>

      <header className="employer-application-details__header">
        <div>
          <h1 className="employer-application-details__title">
            Application Details
          </h1>
          <p className="employer-application-details__description">
            Review the applicant's profile and submitted information.
          </p>
        </div>
      </header>

      {!application ? (
        <div className="employer-application-details__empty">
          <h2>Application Details Not Found</h2>
        </div>
      ) : (
        <div className="employer-application-details__grid">
          <article className="employer-application-details__card employer-application-details__card--profile">
            <div className="employer-application-details__section-heading">
              <span className="employer-application-details__icon">
                <UserRound size={21} aria-hidden="true" />
              </span>
              <h2>Applicant Information</h2>
            </div>

            <div className="employer-application-details__profile">
              <div className="employer-application-details__avatar">
                <UserRound size={30} aria-hidden="true" />
              </div>

              <div>
                <h3>{application?.userId?.name || "Applicant name"}</h3>
                <p>{application?.jobId?.title || "Job title not available"}</p>
              </div>
            </div>

            <div className="employer-application-details__info-row">
              <span>Application ID</span>
              <strong>{applicationId}</strong>
            </div>

            <div className="employer-application-details__info-row">
              <span>Status</span>
              <strong className="employer-application-details__status">
                {application?.status}
              </strong>
            </div>
           <div className="employer-application-details__status-update">
              <h3 className="employer-application-details__status-update-title">
                Update Application Status
              </h3>

              <p className="employer-application-details__status-update-description">
                Select the new status for this applicant.
              </p>

              <select
                className="employer-application-details__status-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>

              <button
                type="button"
                className="employer-application-details__status-button"
                onClick={handleStatusUpdate}
                disabled={!selectedStatus}
              >
                Update Status
              </button>
            </div>
            <div className="employer-application-details__info-row">
              <span>
                <CalendarDays size={15} aria-hidden="true" />
                Applied At
              </span>
              <strong>
                {new Date(application?.appliedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
            </div>
          </article>

          <article className="employer-application-details__card">
            <div className="employer-application-details__section-heading">
              <span className="employer-application-details__icon">
                <Mail size={21} aria-hidden="true" />
              </span>
              <h2>Contact Information</h2>
            </div>

            <div className="employer-application-details__contact">
              <Mail size={18} aria-hidden="true" />
              <div>
                <span>Email</span>
                <p>{application?.userId?.email || "Not provided"}</p>
              </div>
            </div>

            <div className="employer-application-details__contact">
              <Phone size={18} aria-hidden="true" />
              <div>
                <span>Phone</span>
                <p>{application?.userId?.phone || "Not provided"}</p>
              </div>
            </div>
          </article>

          <article className="employer-application-details__card">
            <div className="employer-application-details__section-heading">
              <span className="employer-application-details__icon">
                <CodeXml size={21} aria-hidden="true" />
              </span>
              <h2>Skills</h2>
            </div>

            <div className="employer-application-details__content">
              {application?.userId?.skills?.length ? (
                <div className="employer-application-details__skills">
                  {application.userId.skills.map((skill, index) => (
                    <span key={`${skill}-${index}`}>{skill}</span>
                  ))}
                </div>
              ) : (
                <p className="employer-application-details__muted">
                  No skills provided.
                </p>
              )}
            </div>
          </article>

          <article className="employer-application-details__card">
            <div className="employer-application-details__section-heading">
              <span className="employer-application-details__icon">
                <GraduationCap size={21} aria-hidden="true" />
              </span>
              <h2>Education</h2>
            </div>

            <div className="employer-application-details__content">
              {application?.userId?.education?.length ? (
                <ul className="employer-application-details__education">
                  {application.userId.education.map((item, index) => (
                    <li key={`${item}-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="employer-application-details__muted">
                  No education details provided.
                </p>
              )}
            </div>
          </article>

          <article className="employer-application-details__card employer-application-details__card--resume">
            <div className="employer-application-details__section-heading">
              <span className="employer-application-details__icon">
                <FileText size={21} aria-hidden="true" />
              </span>
              <h2>Resume</h2>
            </div>

            <p className="employer-application-details__resume-name">
              {application?.userId?.resume || "Resume not available"}
            </p>

            <button
              type="button"
              className="employer-application-details__resume-button"
              onClick={handleViewResume}
            >
              <FileText size={17} aria-hidden="true" />
              View Resume
            </button>
          </article>
        </div>
      )}
    </section>
  );
}

export default EmployerApplicationDetails;
