import { useState } from "react";
import api from "../services/api";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/employees/", form)
      .then(() => {
        alert("Employee added successfully");
        setForm({
          employee_id: "",
          full_name: "",
          email: "",
          department: "",
        });
      })
      .catch(err => {
        alert("Error: " + JSON.stringify(err.response?.data));
      });
  };

  return (
    <div className="add-employee-page">
      
      <div className="add-employee-container">

        {/* Left Side Info */}
        <div className="employee-info">
          <h1>Add New Employee</h1>
          <p>
            Fill in the employee details to register them into the HRMS system.
            Ensure all information is correct before submitting.
          </p>
          <div className="info-box">
            <h4>Why Add Employee?</h4>
            <ul>
              <li>Track Attendance</li>
              <li>Manage Department</li>
              <li>Monitor Performance</li>
              <li>Payroll Integration</li>
            </ul>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="employee-form-card">
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={form.employee_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Add Employee
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default AddEmployee;