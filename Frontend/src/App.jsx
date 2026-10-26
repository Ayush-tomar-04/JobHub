import JobHubLayout from "./Component/JobHubLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SavedJob from "./pages/SavedJob";
import AppliedJob from "./pages/AppliedJob";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Job from "./pages/Jobs";
import "./App.css";
import { useEffect, useState } from "react";

import { getJobs } from "./services/jobService";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { applyToJob } from "./services/applicationService";
import { getApplication } from "./services/applicationService";
import { ProtectedRoute } from "./Component/ProtectedRoute";
import { getSaveJob } from "./services/applicationService";
import EmployeLayout from "./Component/EmployerLayout";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerJobs from "./pages/EmployerJobs";
import CreateJob from "./pages/CreateJob";
import ManageJobs from "./pages/ManageJobs";
import EmployerApplications from "./pages/EmployerApplications";
import CompanyProfile from "./pages/CompanyProfile";
import { jwtDecode } from "jwt-decode";

import EmployerApplicationDetails from "./pages/EmployerApplicationDetails";
import EditJob from "./pages/EditJob";
import EmployerProfile from "./pages/EmployerProfile";
import { jobSave, removeSaveJob } from "./services/applicationService";
function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!(localStorage.getItem("token") || localStorage.getItem("EmployerToken"))
)
const token =
  localStorage.getItem("EmployerToken") ||
  localStorage.getItem("token");
const decodedToken = token ? jwtDecode(token) : null
const role = decodedToken?.role

  const [input, setInput] = useState("");
 
  const [jobs, setJobs] = useState([]);
  const [error , setError] = useState(null)

  const [savingJobId, setSavingJobId] = useState(null);
  const [unsavingJobId, setUnsavingJobId] = useState(null);



  async function fetchJobs() {
      try{
        if(role==="user"){
          
      const response = await getJobs();
      const jobArray = response.data;


      const applications = await getApplication()
      const applicationArray = applications.data
      
      const applicationIds = applicationArray.map((job)=>{
        return job.jobId
      })

      const saveJobs = await getSaveJob()
      const saveJobArray = saveJobs.data
      
      const saveJobsId = saveJobArray.map((job)=>{
        return job.jobId
      })
      const formattedJobs = jobArray.map((job) => {
       
        const application = applicationArray.find((application)=>{
          return application.jobId === job._id
      })
       const applicationStatus = application ? application.status : null
       const appliedAt = application ? application.appliedAt : null
       return{
         id: job._id,
        company: job.companyId.name,
        title: job.title,
        location: job.location,
        salary: job.salary,
        jobType: job.jobType,
        experienceRequired: job.experienceRequired,
        description: job.description,
        requirements: job.requirements,
        applied :applicationIds.includes(job._id),
        saved: saveJobsId.includes(job._id),
        status:applicationStatus,
        applicationId: application ? application._id : null,
        appliedAt:appliedAt
       }

      });
    
      setJobs(formattedJobs);
      setError(null)
    }
  }
    catch(err){
      console.log("API ERROR:", err);
      if(!err.response){
        setError("Unable to connect to the server. Please check your internet connection and try again.")
        console.log("SETTING ERROR");
    }
    else if(err.response.status === 502){
      setError("Unable to connect to the server. Please try again in a moment.")
    }
    else if(err.response.status === 500){
      setError("Something went wrong on our server. Please try again in a moment.")
    }
    else if(err.response.status === 400 ){
        setError("Please check your information and try again.")
    }

    else if(err.response.status === 401){
      setError("Your session has expired. Please log in again.")
    }    
  }
  }

  useEffect(() => {
    if(isAuthenticated===false){
      setJobs([])
      return;
    }
    fetchJobs()
  }, [isAuthenticated]);

  //ACtivity State

  const activitydata = JSON.parse(localStorage.getItem("activity"));
  let initialActivity = [];
  if (activitydata === null) {
    initialActivity = [];
  } else {
    initialActivity = activitydata;
  }
  const [activities, setActivities] = useState(initialActivity);

  useEffect(() => {
    localStorage.setItem("activity", JSON.stringify(activities));
  }, [activities]);

  const [notification , setNotification] = useState(null)


  async function handleapply(id) {
    const response = await applyToJob(id);
    if (response.success === true) {
      setNotification("Job Applied Successfully")
      setTimeout(()=>{
        setNotification(null)
      },3000)
      const updateJob = jobs.map((job) => {
        if (job.id === id) {
          return {
            ...job,
            applied: true,
          };
        }
        return job;
      });
      setJobs(updateJob);
    
    const activity = jobs.find((job) => {
      return job.id === id;
    });
    const newActivity = {
      id: activity.id,
      title: activity.title,
      company: activity.company,
      action: "applied",
    };
    setActivities([newActivity, ...activities]);
  }
}
async function handleUnsaved(jobId) {
  try {
    setUnsavingJobId(jobId);

    const response = await removeSaveJob(jobId);

    if (response?.success !== true) {
      setError("Unable to unsave job. Please try again.");
      return;
    }

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, saved: false } : job
      )
    );

    const job = jobs.find((job) => job.id === jobId);

    if (job) {
      setActivities((prevActivities) => [
        {
          id: job.id,
          title: job.title,
          company: job.company,
          action: "unsaved",
          time: Date.now(),
        },
        ...prevActivities,
      ]);
    }

    setError(null);
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Unable to unsave job. Please try again."
    );
  } finally {
    setUnsavingJobId(null);
  }
}

 async function handleSave(jobId) {
  try {
    setSavingJobId(jobId);

    const response = await jobSave(jobId);

    if (response?.success !== true) {
      setError("Unable to save job. Please try again.");
      return;
    }

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, saved: true } : job
      )
    );

    const job = jobs.find((job) => job.id === jobId);

    if (job) {
      setActivities((prevActivities) => [
        {
          id: job.id,
          title: job.title,
          company: job.company,
          action: "saved",
        },
        ...prevActivities,
      ]);
    }

    setError(null);
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Unable to save job. Please try again."
    );
  } finally {
    setSavingJobId(null);
  }
}
function handleJobDetails(id){
        navigate(`/jobs/${id}`)
      }
  return (
    <>
    {notification &&
      <div className="toast">
        {notification}
      </div>
    }
    <Routes>

      {/* Public Route */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login 
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
    />} />

    {/* Private Route */}
   <Route
   path="/*"
   element={
     <ProtectedRoute requiredRole="user">
      <JobHubLayout
        input = {input}
        setInput = {setInput}
        isAuthenticated = {isAuthenticated}
        setIsAuthenticated = {setIsAuthenticated}
      />
    </ProtectedRoute>
   }>
  

          <Route
            path=""
            element={
              <Dashboard
                input={input}
                jobs={jobs}
                setJobs={setJobs}
                activities={activities}
                setActivities={setActivities}
                handleapply={handleapply}
                error = {error}
                setError = {setError}
                fetchJobs = {fetchJobs}
                handleSave={handleSave}
                savingJobId={savingJobId}
                handleUnsaved={handleUnsaved}
                unsavingJobId={unsavingJobId}
                handleJobDetails={handleJobDetails}
              />
            }
          />
          <Route
    path="jobs"
    element={
      <Job 
       jobs={jobs}
      setJobs={setJobs}
      error = {error}
      setError = {setError}
      fetchJobs = {fetchJobs}
      handleapply={handleapply}
      handleSave={handleSave}
      savingJobId={savingJobId}
      handleUnsaved={handleUnsaved}
      unsavingJobId={unsavingJobId}
      handleJobDetails={handleJobDetails}
       />
    }
/>
          <Route
            path="savedjob"
            element={<SavedJob jobs={jobs} setJobs={setJobs} />}
          />
          <Route
            path="appliedjob"
            element={<AppliedJob jobs={jobs} setJobs={setJobs}  />}
          />
          <Route path="profile/:id" element={<Profile jobs={jobs} />} />
          <Route
            path="setting"
            element={
              <Setting
                jobs={jobs}
                setJobs={setJobs}
                activities={activities}
                setActivities={setActivities}
              />
            }
          />
          
          <Route
            path="jobs/:id"
            element={<JobDetails jobs={jobs} handleapply={handleapply} 
              handleSave={handleSave}
              handleUnsaved={handleUnsaved}
            />}
          />
          </Route>
          {/* {EmployeLayout Routes} */}
          <Route
          path="/employer"
          element={
            <ProtectedRoute requiredRole="employer">
              <EmployeLayout/>
            </ProtectedRoute>
          }
          >
            <Route
            path=""
            element={
              <EmployerDashboard/>
            }
            />
            <Route path="applications/:applicationId" element={<EmployerApplicationDetails />} />
            <Route
            path="jobs"
            element={
              <EmployerJobs/>
            }
            />
            <Route
            path="create-job"
            element={
              <CreateJob/>
            }
            />
            <Route
            path="manage-jobs"
            element={
              <ManageJobs/>
            }
            />
            <Route path="jobs/:jobId/edit" element={<EditJob />} />
            <Route
            path="applications"
            element={
              <EmployerApplications/>
            }
            />
            <Route
            path="company"
            element={
              <CompanyProfile/>
            }
            />
            <Route
            path="profile"
            element={
              <EmployerProfile/>
            }
            />
          </Route>
          
      </Routes>
    </>
  );
}

export default App;
