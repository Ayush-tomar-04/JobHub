// function JobCard(props) {
//   return (
//     <div className="jobcard">

//       {props.mode === "dashboard" ? (
//         <>
//           <span>{props.logo}</span>

//           <h2>Job Title: {props.title}</h2>
//           <h2>Company Name: {props.company}</h2>
//           <h2>Location: {props.location}</h2>
//           <h2>Salary: {props.salary}</h2>
           
//           {!props.applied ? (
//             <button onClick={() => props.handleapply(props.id)}>
//               Apply
//             </button>
//           ) : (
//             <button disabled>Applied</button>
//           )}

//           {!props.saved ? (
//             <button onClick={() => props.handleSave(props.id)}>
//               ❤️ Save
//             </button>
//           ) : (
//             <button onClick={() => props.handleUnsaved(props.id)}>
//               💔 Unsave
//             </button>
//           )}
//         </>
//       ) : (
//         <>
//           <span>{props.logo}</span>

//           <h2>Job Title: {props.title}</h2>
//           <h2>Company Name: {props.company}</h2>
//           <h2>Location: {props.location}</h2>
//           <h2>Salary: {props.salary}</h2>

//           <h2>Status: ✅ {props.status}</h2>
//         </>
//       )}

//     </div>
//   );
// }

// export default JobCard;




const statusConfig = {
  pending: {
    label: "Pending",
    color: "yellow"
  },
  reviewing: {
    label: "Under Review",
    color: "blue"
  },
  shortlisted: {
    label: "Shortlisted",
    color: "purple"
  },
  accepted: {
    label: "Accepted",
    color: "green"
  },
  rejected: {
    label: "Rejected",
    color: "red"
  },
  withdrawn: {
    label: "Withdrawn",
    color: "gray"
  }
}
function JobCard(props){
  const currentStatus = statusConfig[props.status]
   let footer;
   if(props.mode === "dashboard"){
    footer = <>
      {!props.applied ? (
             <button onClick={() => props.handleapply(props.id)}>
               Apply
            </button>
           ) : (
             <button disabled>Applied</button>
           )}
           {!props.saved ? (
            <button onClick={() => props.handleSave(props.jobId)}>
               ❤️ Save
             </button>
           ) : (
             <button onClick={() => props.handleUnsaved(props.id)}>
               💔 Unsave
             </button>
          )}
          <button onClick={()=>props.handleJobDetails(props.id)}>View Details</button>
    </>
   }
   else if(props.mode === "applied"){
    footer = <>
          <div className="application-status">
          <span className="status-label">Status:</span>
          <span className={`status-dot ${currentStatus.color}`}></span>
          <span className="status-text">{currentStatus.label}</span>
          </div>
        {props.status === "pending" || props.status === "reviewing" || props.status === "shortlisted" ?
        <button className="withdraw-btn" onClick={()=>props.handlerWithdraw(props.applicationId)}>
          Withdraw Application
        </button> : null

        }
      </>
   }
   else if(props.mode === "saved"){
    footer = <>
      <h2>Status: ✅ {props.status}</h2> 
          <button
          onClick={()=>{
            props.handleUnsaveJob(props.id)
          }}
          >Remove Save Job</button>
    </>
   }
   else{
        footer = <>
          <button
          onClick={()=>{
            props.handleEdit(props.id)
          }}
          >Edit</button>
          <button 
          onClick={()=>{
            props.handleDelete(props.id)
          }} 
          >Delete</button>
        </>
   }

   return(
      
  <div className="job-card">

    <div className="job-header">
      <span className="job-logo">{props.logo}</span>

      <div className="job-info">
        <h3 className="job-title">{props.title}</h3>
        <h3 className="job-company">{props.company}</h3>
      </div>
    </div>

    <div className="job-details">
      <p className="job-location">📍Location: {props.location}</p>
      <p className="job-salary">💰Salary: {props.salary} LPA</p>
      <p className="job-type">💼JobType: {props.jobType}</p>
      <p className="experience-required">🧑‍💻Experince:{props.experienceRequired}</p>
      <p className="applied-date">Applied Date:{props.appliedAt}</p>
    </div>

    <div className="job-footer">
      {footer}
    </div>

  </div>

   );

}
export default JobCard;