import api from "./api";

// Get all employees
export const getEmployees = () => api.get("/employees/");

// Create new employee
export const addEmployee = (data) => api.post("/employees/", data);

// Delete employee
export const deleteEmployee = (id) => api.delete(`/employees/${id}/`);
