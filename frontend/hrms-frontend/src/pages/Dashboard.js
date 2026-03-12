import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/employeeService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_employees: 0,
    present_today: 0,
    absent_today: 0,
    recent_attendance: [],
    chart_data: []
  });

  useEffect(() => {
    getDashboardStats()
      .then(res => {
        setStats(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // ✅ Convert month number to short month name
  const chartData = stats.chart_data.map(item => ({
    month: new Date(2026, item.month - 1).toLocaleString("default", {
      month: "short"
    }),
    present: item.present,
    absent: item.absent
  }));

  return (
    <div className="dashboard-container">
      <h2 className="page-title">Dashboard</h2>

      {/* ================= Top Cards ================= */}
      <div className="stats-grid">
        <div className="stat-card">
          <h6>Total Employees</h6>
          <h3>{stats.total_employees}</h3>
        </div>

        <div className="stat-card">
          <h6>Present Today</h6>
          <h3 style={{ color: "green" }}>{stats.present_today}</h3>
        </div>

        <div className="stat-card">
          <h6>Absent Today</h6>
          <h3 style={{ color: "red" }}>{stats.absent_today}</h3>
        </div>
      </div>

      {/* ================= Bottom Section ================= */}
      <div className="dashboard-bottom">

        {/* ===== Monthly Chart ===== */}
        <div className="bottom-card">
          <h4>Monthly Attendance Overview</h4>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              {/* Green Present */}
              <Bar dataKey="present" fill="#28a745" />

              {/* Red Absent */}
              <Bar dataKey="absent" fill="#dc3545" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===== Recent Attendance Table ===== */}
        <div className="bottom-card">
          <h4>Recent Attendance</h4>

          <table className="attendance-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {stats.recent_attendance?.map((item, index) => (
                <tr key={index}>
                  <td>{item.employee}</td>
                  <td>{item.date}</td>
                  <td
                    style={{
                      color:
                        item.status === "Present"
                          ? "#28a745"
                          : "#dc3545",
                      fontWeight: "bold"
                    }}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
