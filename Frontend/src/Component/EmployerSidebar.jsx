
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FilePlus2,
  ClipboardList,
  Users,
  Building2,
} from "lucide-react";

import "../Employer/EmployerSidebar.css";

function EmployerSidebar() {
  return (
    <aside className="employer-sidebar">
      <div className="employer-sidebar-heading">
        <span className="employer-sidebar-title">WORKSPACE</span>
      </div>

      <nav className="employer-sidebar-nav" aria-label="Employer navigation">
        <NavLink
          to="/employer"
          end
          className={({ isActive }) =>
            `employer-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/employer/jobs"
          className={({ isActive }) =>
            `employer-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <BriefcaseBusiness size={19} />
          <span>My Jobs</span>
        </NavLink>

        <NavLink
          to="/employer/create-job"
          className={({ isActive }) =>
            `employer-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <FilePlus2 size={19} />
          <span>Create Job</span>
        </NavLink>

        <NavLink
          to="/employer/manage-jobs"
          className={({ isActive }) =>
            `employer-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <ClipboardList size={19} />
          <span>Manage Jobs</span>
        </NavLink>

        <NavLink
          to="/employer/applications"
          className={({ isActive }) =>
            `employer-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Users size={19} />
          <span>Applications</span>
        </NavLink>

        <NavLink
          to="/employer/company"
          className={({ isActive }) =>
            `employer-sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <Building2 size={19} />
          <span>Company Profile</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default EmployerSidebar;
