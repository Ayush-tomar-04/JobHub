import { useState } from "react"
import JobCard from "../Component/Jobcard"

function Job({jobs , setJobs}){

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [Form , setForm] = useState(false)
    const [editingId, setEditingId] = useState(null);

    let form =
    <form className="job-form">

      <input
      className="job-input"
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e)=>{
            setTitle(e.target.value)
      }}
      />

      <input
      className="job-input"
      type="text"
      placeholder="Company"
      value={company}
      onChange={(e)=>{
            setCompany(e.target.value)
      }}
      />

      <input
      className="job-input"
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e)=>{
            setLocation(e.target.value)
      }}
      />

      <input
      className="job-input"
      type="text"
      placeholder="Salary"
      value={salary}
      onChange={(e)=>{
            setSalary(e.target.value)
      }}
      />

      {
        editingId === null ? (

      <button
      className="job-submit-btn"
      onClick={(e)=>{
        e.preventDefault()

        if(title.trim()==="" || company.trim()==="" || location.trim()==="" || salary.trim()===""){
            alert("Please Enter Valid Input")
            return
        }

        const newJob = {

            id:Date.now(),
            logo : "🏢",
            title :title,
            company : company,
            location : location,
            salary : salary,
            applied: false,
            saved: false

        }

        setJobs([...jobs,newJob])

        setForm(false)

        setTitle("");
        setCompany("");
        setLocation("");
        setSalary("");

      }}
      >
      Add
      </button>

      ) : (

        <button
        className="job-submit-btn"
        onClick={(e)=>{

          e.preventDefault()

          if(title.trim()==="" || company.trim()==="" || location.trim()==="" || salary.trim()===""){
            alert("Please Enter Valid Input")
            return
          }

          const newEditjob = jobs.map((job)=>{

            if(job.id===editingId){

                return{

                    ...job,

                    title:title,
                    company:company,
                    location:location,
                    salary:salary,

                }

            }

            return job

          })

          setJobs(newEditjob)

          setEditingId(null)

          setForm(false)

          setTitle("");
          setCompany("");
          setLocation("");
          setSalary("");

        }}
        >
        Update
        </button>

      )

      }

    </form>

    function handleDelete(id){

      const filterJob = jobs.filter((job)=>{

           return job.id!==id

      })

      setJobs(filterJob)

    }

    function handleEdit(id){

      setEditingId(id)

      setForm(true)

      const editjob = jobs.find((job)=>{

            return job.id===id

      })

      setTitle(editjob.title)
      setCompany(editjob.company)
      setLocation(editjob.location)
      setSalary(editjob.salary)

    }

    return(

        <div className="job-page">

            <div className="job-page-header">

                <h2 className="job-page-title">
                    💼 Job Management
                </h2>

                <button
                className="add-job-btn"
                onClick={()=>{
                    setForm(true)
                }}
                >
                ➕ Add Job
                </button>

            </div>

            {Form && form}

            <div className="job-page-list">

                {

                jobs.map((job)=>{

                    return(

                        <JobCard

                        handleDelete={handleDelete}
                        handleEdit={handleEdit}

                        key={job.id}

                        id={job.id}

                        logo={job.logo}

                        title={job.title}

                        company={job.company}

                        location={job.location}

                        salary={job.salary}

                        mode="job"

                        />

                    )

                })

                }

            </div>

        </div>

    )

}

export default Job;