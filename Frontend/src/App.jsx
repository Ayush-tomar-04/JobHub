import Navbar from "./Component/Navbar"
import Sidebar from "./Component/Sidebar"
import {Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SavedJob from "./pages/SavedJob"
import AppliedJob from "./pages/AppliedJob"
import Profile from "./pages/Profile"
import Setting from "./pages/Setting"
import Job from "./pages/Jobs"
import "./App.css";
import { useEffect, useState } from "react"
function App() {
  const [input , setInput] = useState("")
  const salary = 0
  const defaultjobs  = [
    {
                    id:1,
                    logo : "🏢",
                    title :"Frontend Devloper",
                    company : "Google",
                    location : "Noida",
                    salary : salary,
                    applied: false,
                    saved: false
                    },
                    {
                    id:2,
                    logo : "🏢",
                    title : "React Devloper",
                    company : "MAQ",
                    location : "Noida",
                    salary : salary,
                    applied: false,
                    saved: false
                    },
                    {
                    id:3,
                    logo : "🏢",
                    title : "Backend Devloper",
                    company : "Dotnet",
                    location : "Gurgaon",
                    salary : salary,
                    applied: false,
                    saved: false
                    }
  ]

  let data = null;
  try{
   data = JSON.parse(localStorage.getItem("jobs"))
          }
          catch{
            data = null
          }
          const isValid = Array.isArray(data) &&
           data.every((job)=>{
            return(
              job.title?.trim() !== "" &&
              job.company?.trim() !== "" &&
              job.location?.trim() !== ""
            );
           })
  
  const initialJob = isValid ? data : defaultjobs
  const [jobs, setJobs]= useState(initialJob)
  

  useEffect(()=>{
      localStorage.setItem("jobs",JSON.stringify(jobs))
  },[jobs])

  //ACtivity State

   const activitydata = JSON.parse(localStorage.getItem("activity"))
    let initialActivity =[] 
    if(activitydata===null){
        initialActivity = []
    }
    else{
        initialActivity = activitydata
    }
    const [activities, setActivities] = useState(initialActivity);

    useEffect(()=>{
          localStorage.setItem("activity",JSON.stringify(activities))
    },[activities])
                  
                
  return (
    <>
     
     <Navbar
      input = {input}
      setInput = {setInput}
     />
     <div className="layout">
       <Sidebar/>

       <Routes>
        <Route path="/"
         element={<Dashboard
          input={input}
          jobs = {jobs}
          setJobs = {setJobs}
          activities = {activities}
          setActivities = {setActivities}
         />}/>
         <Route path="/jobs"
         element={<Job
          jobs = {jobs}
          setJobs = {setJobs}
         />}/>
         <Route path="/savedjob"
         element={<SavedJob
          jobs = {jobs}
          setJobs = {setJobs}
         />}/>
         <Route path="/appliedjob"
         element={<AppliedJob
          jobs = {jobs}
          setJobs = {setJobs}
         />}/>
         <Route path="/profile/:id"
         element={<Profile
          jobs = {jobs}
         />}/>
         <Route path="/setting"
          element={<Setting
            jobs = {jobs}
            setJobs = {setJobs}
            activities = {activities}
            setActivities = {setActivities}
            defaultjobs = {defaultjobs}
          />}/>
       </Routes>
     </div>
      

    </>
  )
}

export default App
