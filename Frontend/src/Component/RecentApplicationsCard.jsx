import { UserRound } from "lucide-react";

function RecentApplicationsCard(props) {
  const status = (props.status || "pending").toLowerCase();

  return (
    <article className="recent-application-card">
      <div className="recent-application-card__avatar">
        <UserRound size={28} aria-hidden="true" />
      </div>

      <div className="recent-application-card__details">
        <h3 className="recent-application-card__name">
          {props.name || "Unknown applicant"}
        </h3>

        <p className="recent-application-card__job-title">
          {props.title || "Job title unavailable"}
        </p>
      </div>

      <span
        className={`recent-application-card__status recent-application-card__status--${status}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>

      <p className="recent-application-card__date">
        Applied:{" "}
        {props.appliedAt
          ? new Date(props.appliedAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Date unavailable"}
      </p>
    </article>
  );
}

export default RecentApplicationsCard;