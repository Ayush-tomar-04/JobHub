
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOneJob, updateJob } from "../services/employerService";
import "../Employer/employer.css"

function EditJob() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: [],
    experienceRequired: "",
    jobType: "",
  });

  function showError(message) {
    setError(message);
    setTimeout(() => setError(""), 3000);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  useEffect(() => {
    async function getJob() {
      try {
        const response = await getOneJob(jobId);
        const job = response.data;

        setFormData({
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          salary: job.salary ?? "",
          requirements: job.requirements || [],
          experienceRequired: job.experienceRequired || "",
          jobType: job.jobType || "",
        });
      } catch (error) {
        showError(
          error.response?.data?.message || "Failed to fetch job."
        );
      }
    }

    getJob();
  }, [jobId]);

  async function handleUpdateEdit(e) {
    e.preventDefault();
    showError("");
    setLoading(true);

    try {
      const response = await updateJob(jobId, formData);

      if (response?.success === true) {
        navigate("/employer/manage-jobs");
      } else {
        showError("Update Failed Something Wrong");
      }
    } catch (err) {
      showError(
        err.response?.data?.message ||
          "Failed to update job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="edit-job">
      <header className="edit-job__header">
        <div>
          <h1 className="edit-job__title">Edit Job</h1>
          <p className="edit-job__description">
            Update your job posting details below.
          </p>
        </div>
      </header>

      {error && (
        <p className="edit-job__error" role="alert">
          {error}
        </p>
      )}

      <form
        className="edit-job__form"
        onSubmit={handleUpdateEdit}
      >
        <div className="edit-job__field">
          <label htmlFor="edit-title">Job Title</label>
          <input
            id="edit-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-job__field">
          <label htmlFor="edit-location">Location</label>
          <input
            id="edit-location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-job__field edit-job__field--full">
          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            className="edit-job__textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-job__field">
          <label htmlFor="edit-salary">Salary (LPA)</label>
          <input
            id="edit-salary"
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="edit-job__field">
          <label htmlFor="edit-experience">
            Experience Required
          </label>
          <select
            id="edit-experience"
            name="experienceRequired"
            value={formData.experienceRequired}
            onChange={handleChange}
            required
          >
            <option value="">Select experience</option>
            <option value="0-2 years">0–2 years</option>
            <option value="2-4 years">2–4 years</option>
            <option value="4-6 years">4–6 years</option>
            <option value="6+ years">6+ years</option>
          </select>
        </div>

        <div className="edit-job__field">
          <label htmlFor="edit-job-type">Job Type</label>
          <select
            id="edit-job-type"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select job type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="edit-job__field edit-job__field--full">
          <label htmlFor="edit-requirements">
            Requirements
          </label>
          <textarea
            id="edit-requirements"
            className="edit-job__textarea"
            value={formData.requirements.join("\n")}
            onChange={(e) =>
              setFormData({
                ...formData,
                requirements: e.target.value
                  .split("\n")
                  .filter((item) => item.trim() !== ""),
              })
            }
            placeholder="Enter each requirement on a new line"
            required
          />
          <span className="edit-job__hint">
            Write one requirement per line.
          </span>
        </div>

        <div className="edit-job__actions">
          <button
            type="button"
            className="edit-job__cancel-button"
            onClick={() => navigate("/employer/manage-jobs")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="edit-job__submit-button"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Job"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditJob;
