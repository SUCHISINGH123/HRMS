import { useState } from "react";
import api from "../services/api";

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
        alert("Error: " + JSON.stringify(err.response.data));
      });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="employee_id" placeholder="Employee ID" value={form.employee_id} onChange={handleChange} required />
        <br /><br />
        <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required />
        <br /><br />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br /><br />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <br /><br />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
