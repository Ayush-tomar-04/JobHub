
import {
  CodeXml,
  MapPin,
  Banknote,
  BriefcaseBusiness,
  UserRound,
  CalendarDays,
  Eye,
} from "lucide-react";
import "../Employer/employer.css";

function EmployerJobCard(props) {
  return (
    <article className="employer-job-card">
      <header className="employer-job-card__header">
        <div className="employer-job-card__heading">
          <div className="employer-job-card__icon">
            <CodeXml size={26} aria-hidden="true" />
          </div>

          <div className="employer-job-card__title-group">
            <h2 className="employer-job-card__title">{props.title}</h2>
            {props.company && (
              <p className="employer-job-card__company">{props.company}</p>
            )}
            <p className="employer-job-card__location">
              <MapPin size={17} aria-hidden="true" />
              <span>{props.location}</span>
            </p>
          </div>
        </div>

        <span
          className={`employer-job-card__status ${
            props.isActive
              ? "employer-job-card__status--active"
              : "employer-job-card__status--inactive"
          }`}
        >
          <span className="employer-job-card__status-dot" />
          {props.isActive ? "Active" : "Inactive"}
        </span>
      </header>

      <div className="employer-job-card__details">
        <div className="employer-job-card__detail">
          <span className="employer-job-card__detail-icon">
            <Banknote size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="employer-job-card__detail-label">Salary</p>
            <p className="employer-job-card__detail-value">
              {props.salary} LPA
            </p>
          </div>
        </div>

        <div className="employer-job-card__detail">
          <span className="employer-job-card__detail-icon">
            <BriefcaseBusiness size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="employer-job-card__detail-label">Job Type</p>
            <p className="employer-job-card__detail-value">{props.jobType}</p>
          </div>
        </div>

        <div className="employer-job-card__detail">
          <span className="employer-job-card__detail-icon">
            <UserRound size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="employer-job-card__detail-label">Experience</p>
            <p className="employer-job-card__detail-value">
              {props.experienceRequired}
            </p>
          </div>
        </div>

        <div className="employer-job-card__detail">
          <span className="employer-job-card__detail-icon">
            <CalendarDays size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="employer-job-card__detail-label">Posted Date</p>
            <p className="employer-job-card__detail-value">
              {props.appliedAt}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default EmployerJobCard;
