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
import AddBook from "../books/AddBook";
import RentOut from "../rent/RentOut";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/rentBook" element={<RentOut />} />
    <Route
      path="/admin-panel"
      element={<ProtectedRoute element={AdminPanel} />}
    />
    <Route
      path="/user-details"
      element={<ProtectedRoute element={UserDetails} />}
    />
    <Route
      path="/user-info"
      element={<ProtectedRoute element={UserDetails} />}
    />
    <Route path="/add-book" element={<AddBook />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/usersToBeCreated"
      element={<ProtectedRoute element={UserToBeCreatedPage} />}
    />
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
