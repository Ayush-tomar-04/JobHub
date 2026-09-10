import { NavLink } from "react-router-dom";
import "../App.css";

function Sidebar(){
    return(
        <div className="sidebar">

            <NavLink className="sidebar-link" to="/">
                🏠 Dashboard
            </NavLink>

            <NavLink className="sidebar-link" to="/jobs">
                💼 Jobs
            </NavLink>

            <NavLink className="sidebar-link" to="/savedjob">
                ❤️ Saved Jobs
            </NavLink>

            <NavLink className="sidebar-link" to="/appliedjob">
                📄 Applied Jobs
            </NavLink>

            <NavLink className="sidebar-link" to="/profile/101">
                👤 Profile
            </NavLink>

            <NavLink className="sidebar-link" to="/setting">
                ⚙️ Setting
            </NavLink>

        </div>
    )
}

export default Sidebar;