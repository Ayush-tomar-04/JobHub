
import { NavLink, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";
import "../employer/employer.css";
function EmployerNavbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("employerToken");
    navigate("/login");
  }

  return (
    <nav className="employer-navbar">
      <h2 className="employer-navbar__brand">
        <BriefcaseBusiness size={25} />
        <span>JobHub AI</span>
      </h2>

      <div className="employer-navbar__actions">
        <NavLink
          to="/employer/profile"
          title="Employer Profile"
          aria-label="Employer Profile"
          className={({ isActive }) =>
            `employer-navbar__link ${
              isActive ? "employer-navbar__link--active" : ""
            }`
          }
        >
          <UserRound size={20} />
        </NavLink>

        <NavLink
          to="/employer/setting"
          title="Settings"
          className={({ isActive }) =>
            `employer-navbar__link ${
              isActive ? "employer-navbar__link--active" : ""
            }`
          }
        >
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="employer-navbar__logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default EmployerNavbar;
