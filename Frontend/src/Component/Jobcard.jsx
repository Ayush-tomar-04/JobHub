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

function JobCard(props){
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
            <button onClick={() => props.handleSave(props.id)}>
               ❤️ Save
             </button>
           ) : (
             <button onClick={() => props.handleUnsaved(props.id)}>
               💔 Unsave
             </button>
          )}

    </>
   }
   else if(props.mode === "applied"){
    footer = <h2>Status: ✅ {props.status}</h2>
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
        <h2 className="job-title">{props.title}</h2>
        <h3 className="job-company">{props.company}</h3>
      </div>
    </div>

    <div className="job-details">
      <p className="job-location">📍 {props.location}</p>
      <p className="job-salary">💰 {props.salary}</p>
    </div>

    <div className="job-footer">
      {footer}
    </div>

  </div>

   );

}
export default JobCard;