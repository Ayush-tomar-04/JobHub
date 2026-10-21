
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  BriefcaseBusiness,
  UserRound,
  Banknote,
  CalendarDays,
  Eye,
  Pencil,
  Power,
} from "lucide-react";
import "../Employer/employer.css";

function MangeJobCard(props) {
  const navigate = useNavigate();

  return (
    <article className="manage-job-card">
      <header className="manage-job-card__header">
        <div className="manage-job-card__heading">
          <h2 className="manage-job-card__title">{props.title}</h2>

          <span
            className={`manage-job-card__status ${
              props.isActive
                ? "manage-job-card__status--active"
                : "manage-job-card__status--inactive"
            }`}
          >
            <span className="manage-job-card__status-dot" />
            {props.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </header>

      <div className="manage-job-card__details">
        <div className="manage-job-card__detail">
          <MapPin size={19} aria-hidden="true" />
          <div>
            <p className="manage-job-card__label">Location</p>
            <p className="manage-job-card__value">{props.location}</p>
          </div>
        </div>

        <div className="manage-job-card__detail">
          <BriefcaseBusiness size={19} aria-hidden="true" />
          <div>
            <p className="manage-job-card__label">Job Type</p>
            <p className="manage-job-card__value">{props.jobType}</p>
          </div>
        </div>

        <div className="manage-job-card__detail">
          <UserRound size={19} aria-hidden="true" />
          <div>
            <p className="manage-job-card__label">Experience Required</p>
            <p className="manage-job-card__value">
              {props.experienceRequired}
            </p>
          </div>
        </div>

        <div className="manage-job-card__detail">
          <Banknote size={19} aria-hidden="true" />
          <div>
            <p className="manage-job-card__label">Salary</p>
            <p className="manage-job-card__value">{props.salary} LPA</p>
          </div>
        </div>

        <div className="manage-job-card__detail">
          <CalendarDays size={19} aria-hidden="true" />
          <div>
            <p className="manage-job-card__label">Date</p>
            <p className="manage-job-card__value">
              {props.date
                ? new Date(props.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Date not available"}
            </p>
          </div>
        </div>
      </div>

      <footer className="manage-job-card__actions">
        <button
          type="button"
          className="manage-job-card__button manage-job-card__button--view"
          onClick={() => navigate("/employer/jobs")}
        >
          <Eye size={17} aria-hidden="true" />
          View
        </button>

        <button
          type="button"
          className="manage-job-card__button manage-job-card__button--edit"
          onClick={() => props.handleEdit(props.jobId)}
        >
          <Pencil size={17} aria-hidden="true" />
          Edit
        </button>

        <button
          type="button"
          className="manage-job-card__button manage-job-card__button--deactivate"
          onClick={() => props.handleDeactivate(props.jobId)}
        >
          <Power size={17} aria-hidden="true" />
          Deactivate
        </button>
      </footer>
    </article>
  );
}

export default MangeJobCard;
