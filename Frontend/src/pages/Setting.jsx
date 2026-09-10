function Setting({jobs,setJobs,activities,setActivities,defaultjobs}){

    function removeSave(){
        const newremoveJob = jobs.map((job)=>{
                 return{
                    ...job,
                    saved:false
                 }
              })
              setJobs(newremoveJob)
    }

    function removeApply(){
        const newremoveapply = jobs.map((job)=>{
                    return{
                        ...job,
                        applied:false
                    }
                })
                setJobs(newremoveapply)
    }

    return(

        <div className="setting-page">

            <h2 className="setting-title">
                ⚙️ Settings
            </h2>

            <div className="setting-card">

                <button
                className="setting-btn setting-blue"
                onClick={()=>{
                    removeSave()
                }}
                >
                    🗑 Clear Saved Jobs
                </button>

                <button
                className="setting-btn setting-orange"
                onClick={()=>{
                    removeApply()
                }}
                >
                    📄 Clear Applied Jobs
                </button>

                <button
                className="setting-btn setting-yellow"
                onClick={()=>{
                    setActivities([])
                }}
                >
                    🧹 Clear Activity
                </button>

                <button
                className="setting-btn setting-red"
                onClick={()=>{
                    setActivities([])
                    setJobs(defaultjobs)
                    localStorage.removeItem("jobs")
                    localStorage.removeItem("activity")
                }}
                >
                    ♻ Reset All Data
                </button>

            </div>

        </div>

    )

}

export default Setting;