
import { Outlet } from "react-router-dom";
import EmployerSidebar from "./EmployerSidebar";
import EmployerNavbar from "./EmployerNavbar";
import "../Employer/employer.css";
function EmployeLayout() {
  return (
    <div className="employer-layout">
      <EmployerNavbar />

      <div className="employer-layout__body">
        <EmployerSidebar />

        <main className="employer-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default EmployeLayout;
