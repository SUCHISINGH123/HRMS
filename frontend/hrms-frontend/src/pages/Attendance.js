import { useEffect, useState } from "react";
import api from "../services/api";
import "./Attendance.css";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/employees/")
      .then(res => setEmployees(res.data))
      .catch(() => setError("Failed to load employees"));
  }, []);

  useEffect(() => {
    if (employeeId) {
      setLoading(true);
      api.get(`/attendance/employee/${employeeId}/`)
        .then(res => {
          setAttendance(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load attendance records");
          setLoading(false);
        });
    }
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    api.post("/attendance/", {
      employee: employeeId,
      date,
      status
    })
    .then(() => {
      setMessage("Attendance marked successfully");
      setDate("");
    })
    .catch(() => {
      setError("Failed to mark attendance");
    });
  };

  return (
    <div className="attendance-container">

      <div className="attendance-header">
        <h2>Attendance Management</h2>
        <p>Mark and track employee attendance records</p>
      </div>

      <div className="attendance-grid">

        {/* Mark Attendance Card */}
        <div className="card">
          <h3>Mark Attendance</h3>

          <form onSubmit={handleSubmit} className="attendance-form">

            <div className="form-group">
              <label>Select Employee</label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              >
                <option value="">Choose employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.full_name} ({emp.employee_id})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">
              Submit Attendance
            </button>

            {message && <div className="alert success">{message}</div>}
            {error && <div className="alert error">{error}</div>}

          </form>
        </div>

        {/* Attendance Records */}
        <div className="card">
          <h3>Attendance Records</h3>

          {!employeeId && <p className="info-text">Select an employee to view attendance.</p>}
          {loading && <p className="info-text">Loading attendance...</p>}

          {!loading && employeeId && attendance.length === 0 && (
            <p className="info-text">No attendance records found.</p>
          )}

          {!loading && attendance.length > 0 && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map(record => (
                    <tr key={record.id}>
                      <td>{record.date}</td>
                      <td>
                        <span className={
                          record.status === "Present"
                            ? "badge present"
                            : "badge absent"
                        }>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Attendance;