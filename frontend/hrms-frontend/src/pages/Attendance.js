import { useEffect, useState } from "react";
import api from "../services/api";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load employees for dropdown
  useEffect(() => {
    api.get("/employees/")
      .then(res => setEmployees(res.data))
      .catch(() => setError("Failed to load employees"));
  }, []);

  // Load attendance when employee changes
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
      setError("");     // 🔥 VERY IMPORTANT
      setDate("");
    })
    .catch(() => {
      setError("Failed to mark attendance");
      setMessage("");   // optional but clean
    });
      
  };

  return (
    <div>
      <h2>Attendance Management</h2>

      {/* Attendance Form */}
      <form onSubmit={handleSubmit} style={styles.card}>
        <h3>Mark Attendance</h3>

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>
              {emp.full_name} ({emp.employee_id})
            </option>
          ))}
        </select>

        <br /><br />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <br /><br />

        <button type="submit">Submit Attendance</button>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* Attendance Records */}
      <div style={styles.card}>
        <h3>Attendance Records</h3>

        {!employeeId && <p>Select an employee to view attendance.</p>}

        {loading && <p>Loading attendance...</p>}

        {!loading && employeeId && attendance.length === 0 && (
          <p>No attendance records found.</p>
        )}

        {!loading && attendance.length > 0 && (
          <table width="100%" border="1" cellPadding="10">
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
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: "#f9fafb",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb"
  }
};

export default Attendance;
