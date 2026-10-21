
import { useState } from "react"
import { postJobs } from "../services/employerService"
import "../../CreateJob.css";

function CreateJob() {
    const [title, setTitle] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")
    const [skills, setSkills] = useState("")
    const [description, setDescription] = useState("")
    const [jobType, setJobType] = useState("Full-time")
    const [experienceRequired, setExperienceRequired] = useState("0-2 years")
    const [Form, setForm] = useState(false)
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    function showMessage(type, text) {
        if (type === "success") {
            setMessage(text)
            setTimeout(() => setMessage(""), 3000)
        } else {
            setError(text)
            setTimeout(() => setError(""), 3000)
        }
    }

    const requirements = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0)

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage("")
        setError("")

        const jobData = {
            title,
            salary,
            location,
            requirements,
            description,
            jobType,
            experienceRequired,
        }

        if (
            title.trim() === "" ||
            salary.trim() === "" ||
            location.trim() === "" ||
            skills.trim() === "" ||
            requirements.length === 0 ||
            description.trim() === ""
        ) {
            return showMessage(
                "error",
                "Input Field is Invalid or required"
            )
        }

        setLoading(true)

        try {
            const response = await postJobs(jobData)

            if (response?.success === true) {
                showMessage("success", "Job Created Successfully")

                setTitle("")
                setDescription("")
                setLocation("")
                setSalary("")
                setSkills("")
                setExperienceRequired("0-2 years")
                setJobType("Full-time")

                setForm(false)
            } else {
                showMessage("error", "Failed to Create Job")
            }
        } catch (err) {
            showMessage(
                "error",
                err.response?.data?.message || "Something went wrong"
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="create-job-page">
            <div className="create-job-header">
                <div>
                    <h1>Create a Job</h1>
                    <p>Find the right candidates for your company.</p>
                </div>

                {!Form && (
                    <button
                        type="button"
                        className="create-job-button"
                        onClick={() => {
                            setForm(true)
                            setMessage("")
                            setError("")
                        }}
                    >
                        + Create Job
                    </button>
                )}
            </div>

            {error && (
                <p className="job-error" role="alert">
                    {error}
                </p>
            )}

            {message && (
                <p className="job-success" role="status">
                    {message}
                </p>
            )}

            {Form && (
                <div className="create-job-card">
                    <div className="create-job-card-header">
                        <div>
                            <h2>Job Details</h2>
                            <p>
                                Enter the details of the position you want
                                to post.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="close-job-form"
                            onClick={() => {
                                setForm(false)
                                setError("")
                            }}
                            aria-label="Close job form"
                        >
                            ×
                        </button>
                    </div>

                    <form
                        className="create-job-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-field">
                            <label htmlFor="job-title">Job Title</label>
                            <input
                                id="job-title"
                                className="form-input"
                                type="text"
                                value={title}
                                placeholder="e.g. Frontend Developer"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-location">Location</label>
                            <input
                                id="job-location"
                                className="form-input"
                                type="text"
                                value={location}
                                placeholder="e.g. Noida, India or Remote"
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-field">
                                <label htmlFor="job-type">Job Type</label>
                                <select
                                    id="job-type"
                                    className="form-input"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </div>

                            <div className="form-field">
                                <label htmlFor="job-experience">
                                    Experience Required
                                </label>
                                <select
                                    id="job-experience"
                                    className="form-input"
                                    value={experienceRequired}
                                    onChange={(e) =>
                                        setExperienceRequired(e.target.value)
                                    }
                                >
                                    <option value="0-2 years">0-2 years</option>
                                    <option value="2-4 years">2-4 years</option>
                                    <option value="4-6 years">4-6 years</option>
                                    <option value="6+ years">6+ years</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-salary">Annual Salary (₹)</label>
                            <input
                                id="job-salary"
                                className="form-input"
                                type="number"
                                min="0"
                                value={salary}
                                placeholder="e.g. 800000 for ₹8 LPA"
                                onChange={(e) => setSalary(e.target.value)}
                                required
                            />
                            <span className="field-hint">
                                Enter the annual salary in rupees.
                            </span>
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-skills">
                                Required Skills
                            </label>
                            <input
                                id="job-skills"
                                className="form-input"
                                type="text"
                                value={skills}
                                placeholder="React, JavaScript, HTML, CSS"
                                onChange={(e) => setSkills(e.target.value)}
                                required
                            />
                            <span className="field-hint">
                                Separate skills with commas.
                            </span>
                        </div>

                        <div className="form-field">
                            <label htmlFor="job-description">
                                Job Description
                            </label>
                            <textarea
                                id="job-description"
                                className="form-input form-textarea"
                                value={description}
                                placeholder="Describe the role and responsibilities..."
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-job-button"
                                disabled={loading}
                                onClick={() => {
                                    setForm(false)
                                    setError("")
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-job-button"
                                disabled={loading}
                            >
                                {loading ? "Posting..." : "Post Job"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default CreateJob
