
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import "../Employer/employer.css"
function EmployerApplicationCard(props) {
  const navigate = useNavigate();

  return (
    <article className="employer-application-card">
      <div className="employer-application-card__main">
        <div className="employer-application-card__avatar">
          <UserRound size={25} aria-hidden="true" />
        </div>

        <div className="employer-application-card__candidate">
          <h3 className="employer-application-card__name">
            {props.name}
          </h3>

          <p className="employer-application-card__email">
            <Mail size={15} aria-hidden="true" />
            <span>{props.email}</span>
          </p>
        </div>

        <span
          className={`employer-application-card__status employer-application-card__status--${String(
            props.status || "pending"
          ).toLowerCase()}`}
        >
          {props.status || "Pending"}
        </span>
      </div>

      <div className="employer-application-card__job">
        <span className="employer-application-card__label">
          <BriefcaseBusiness size={16} aria-hidden="true" />
          Applied for
        </span>
        <p className="employer-application-card__job-title">
          {props.title || "Job title not available"}
        </p>
      </div>

      <div className="employer-application-card__meta">
        <div className="employer-application-card__meta-item">
          <CalendarDays size={17} aria-hidden="true" />
          <div>
            <span className="employer-application-card__label">
              Applied Date
            </span>
            <p>
              {new Date(props.appliedAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="employer-application-card__meta-item">
          <FileText size={17} aria-hidden="true" />
          <div>
            <span className="employer-application-card__label">
              Resume
            </span>
            <p>
              {props.resume || "Resume not available"}
            </p>
          </div>
        </div>
      </div>

      <footer className="employer-application-card__footer">
        <button
          type="button"
          className="employer-application-card__view-button"
          onClick={() =>
            navigate(`/employer/applications/${props.applicationId}`)
          }
        >
          View Details
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </footer>
    </article>
  );
}

export default EmployerApplicationCard;
