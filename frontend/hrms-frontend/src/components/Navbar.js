import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h3>HRMS Lite</h3>
      <div>
        <Link to="/employees" style={styles.link}>Employees</Link>
        <Link to="/employees/add" style={styles.link}>Add Employee</Link>
        <Link to="/attendance" style={styles.link}>Attendance</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#1f2937",
    color: "white",
  },
  link: {
    color: "white",
    marginLeft: "15px",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Navbar;
