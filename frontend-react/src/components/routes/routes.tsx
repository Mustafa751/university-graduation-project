// routes.tsx
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import AdminPanel from "../admin/AdminPanel";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoute from "./protectedRoutes";
import UserDetails from "../user/UserDetails";
import SingleBook from "../books/SingleBook";
import UserToBeCreatedPage from "../user/UserToBeCreatedPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin-panel" element={<AdminPanel />} />
    <Route path="/user-details" element={<UserDetails />} />
    <Route path="/user-info" element={<UserDetails />} />
    <Route path="/register" element={<Register />} />
    <Route path="/usersToBeCreated" element={<UserToBeCreatedPage />} />
    <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
    <Route path="/book/:id" element={<ProtectedRoute element={SingleBook} />} />
    <Route
      path="/admin-panel"
      element={<ProtectedRoute element={AdminPanel} />}
    />
    // Add more routes as needed
  </Routes>
);

export default AppRoutes;
