import api from "./api";

// Get all employees
export const getEmployees = () => api.get("/employees/");

// Create new employee
export const addEmployee = (data) => api.post("/employees/", data);

// Delete employee
export const deleteEmployee = (id) => api.delete(`/employees/${id}/`);

// ✅ Get single employee by ID
export const getEmployeeById = (id) =>
  api.get(`/employees/${id}/`);

// ✅ Update employee
export const updateEmployee = (id, data) =>
  api.patch(`/employees/update/${id}/`, data);

// Get dashboard statistics
export const getDashboardStats = () => api.get("/dashboard-stats/");

