import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
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
import { applyToJob } from "./services/applicationService";
function App() {
  const [input, setInput] = useState("");
  const salary = 0;
  const defaultjobs = [
    {
      id: 1,
      logo: "🏢",
      title: "Frontend Devloper",
      company: "Google",
      location: "Noida",
      salary: salary,
      applied: false,
      saved: false,
    },
    {
      id: 2,
      logo: "🏢",
      title: "React Devloper",
      company: "MAQ",
      location: "Noida",
      salary: salary,
      applied: false,
      saved: false,
    },
    {
      id: 3,
      logo: "🏢",
      title: "Backend Devloper",
      company: "Dotnet",
      location: "Gurgaon",
      salary: salary,
      applied: false,
      saved: false,
    },
  ];
  
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      const response = await getJobs();

      const jobArray = response.data;

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
        
        saved: false,
      }));

      setJobs(formattedJobs);
    }
    fetchJobs();
  }, []);

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
      <Navbar input={input} setInput={setInput} />
      <div className="layout">
        <Sidebar />

        <Routes>
          <Route
            path="/"
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
          <Route path="/jobs" element={<Job jobs={jobs} setJobs={setJobs} />} />
          <Route
            path="/savedjob"
            element={<SavedJob jobs={jobs} setJobs={setJobs} />}
          />
          <Route
            path="/appliedjob"
            element={<AppliedJob jobs={jobs} setJobs={setJobs} />}
          />
          <Route path="/profile/:id" element={<Profile jobs={jobs} />} />
          <Route
            path="/setting"
            element={
              <Setting
                jobs={jobs}
                setJobs={setJobs}
                activities={activities}
                setActivities={setActivities}
                defaultjobs={defaultjobs}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/jobs/:id"
            element={<JobDetails jobs={jobs} handleapply={handleapply} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
