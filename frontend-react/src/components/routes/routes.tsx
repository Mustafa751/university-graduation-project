// routes.tsx
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import AdminPanel from "../admin/AdminPanel";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoute from "./protectedRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
    <Route
      path="/admin-panel"
      element={<ProtectedRoute element={AdminPanel} />}
    />
    // Add more routes as needed
  </Routes>
);

export default AppRoutes;
