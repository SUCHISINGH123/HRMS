import { NavLink } from "react-router-dom";
import { FaUsers, FaCalendar, FaTachometerAlt, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="logo">HRMS Lite</h3>

      <NavLink to="/" className="menu">
        <FaTachometerAlt /> Dashboard
      </NavLink>

      <NavLink to="/employees" className="menu">
        <FaUsers /> Employees
      </NavLink>

      {/* 👇 Add Employee Option */}
      <NavLink to="/add-employee" className="menu">
        <FaUserPlus /> Add Employee
      </NavLink>

      <NavLink to="/attendance" className="menu">
        <FaCalendar /> Attendance
      </NavLink>
    </div>
  );
};

export default Sidebar;
