import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "../services/employeeService";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id)
        .then(() => fetchEmployees())
        .catch((err) => console.log(err));
    }
  };

  // 🔥 Edit button click
  const handleEditClick = (emp) => {
    setEditingId(emp.id);
    setEditData({
      name: emp.name || emp.full_name || emp.employee_name || "",
      email: emp.email || "",
      department: emp.department || "",
    });
  };

  // Form input change
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  // Update employee
  const handleUpdate = (e) => {
    e.preventDefault();

    updateEmployee(editingId, editData)
      .then(() => {
        alert("Employee updated successfully!");
        setEditingId(null);
        fetchEmployees();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h2>Employee List</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/add-employee")}
        >
          + Add Employee
        </button>
      </div>

      <div className="employee-card">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <>
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>
                      {emp.name ||
                        emp.full_name ||
                        emp.employee_name ||
                        ""}
                    </td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(emp)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  {/* 🔥 INLINE EDIT FORM */}
                  {editingId === emp.id && (
                    <tr className="edit-row">
                      <td colSpan="5">
                        <form
                          className="edit-form"
                          onSubmit={handleUpdate}
                        >
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                          />

                          <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                          />

                          <input
                            type="text"
                            name="department"
                            value={editData.department}
                            onChange={handleChange}
                            placeholder="Department"
                            required
                          />

                          <button type="submit" className="update-btn">
                            Save
                          </button>

                          <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </form>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;