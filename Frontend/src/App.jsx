import JobHubLayout from "./Component/JobHubLayout";
import { Route, Routes } from "react-router-dom";
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


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
)

  const [input, setInput] = useState("");
 
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if(isAuthenticated===false){
      setJobs([])
      return;
    }
    async function fetchJobs() {
      const response = await getJobs();
      const jobArray = response.data;

      const applications = await getApplication()
      const applicationArray = applications.data

      const applicationIds = applicationArray.map((job)=>{
        return job.jobId
      })
      const formattedJobs = jobArray.map((job) => ({
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
        saved: false,
      }));

      setJobs(formattedJobs);
    }
    fetchJobs();
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

  return (
    <>
    {notification &&
      <div className="toast">
        {notification}
      </div>
    }
    <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login 
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
    />} />
   <Route
   path="/*"
   element={
     <ProtectedRoute>
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
              />
            }
          />
          <Route
    path="jobs"
    element={
      <Job jobs={jobs} setJobs={setJobs} />
    }
/>
          <Route
            path="savedjob"
            element={<SavedJob jobs={jobs} setJobs={setJobs} />}
          />
          <Route
            path="appliedjob"
            element={<AppliedJob jobs={jobs} setJobs={setJobs} />}
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
            element={<JobDetails jobs={jobs} handleapply={handleapply} />}
          />
          </Route>
      </Routes>
    </>
  );
}

export default App;
