function Profile({jobs}){

    const savJob = jobs.filter((job)=>{
        return job.saved===true
    })
    const saveJob = savJob.length

    const filterJob = jobs.filter((job)=>{
        return job.applied===true
    })
    const applyJob = filterJob.length

    const totalJob = jobs.length

    return(
        <div className="profile-page">

            <h2 className="profile-heading">
                👤 My Profile
            </h2>

            <div className="profile-card">

                

                <div className="profile-info">

                    <h2 className="profile-name">
                        Name: Ayush Chaudhary
                    </h2>

                    <h2 className="profile-email">
                        Email: ayush12@gmail.com
                    </h2>

                    <h2 className="profile-location">
                        Location: Noida
                    </h2>

                </div>

            </div>

            <div className="profile-statistics">

                <h2 className="profile-stat-heading">
                    📊 Statistics
                </h2>

                <h2 className="profile-stat-item">
                    ❤️ Saved Jobs : {saveJob}
                </h2>

                <h2 className="profile-stat-item">
                    📄 Applied Jobs : {applyJob}
                </h2>

                <h2 className="profile-stat-item">
                    📈 Total Jobs : {totalJob}
                </h2>

                <h2 className="profile-stat-item">
                    🏆 Profile Completion : 100%
                </h2>

            </div>

        </div>
    )
}

export default Profile;