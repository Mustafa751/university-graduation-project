// routes.tsx
import { Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import AdminPanel from "../admin/AdminPanel";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ProtectedRoute from "../routes/protectedRoutes";
import UserDetails from "../user/UserDetails";
import SingleBook from "../books/SingleBook";
import UserToBeCreatedPage from "../user/UserToBeCreatedPage";
import AddBook from "../books/AddBook";
import RentOut from "../rent/RentOut";
import UserBooks from "../user/UserBooks";
import EditBooksDisplay from "../books/EditBooksDisplay";
import EditBook from "../books/EditBook";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/rentBook" element={<RentOut />} />
    <Route path="/admin-panel" element={<AdminPanel />} />
    <Route
      path="/user-books/:userId"
      element={<ProtectedRoute element={UserBooks} />}
    />
    <Route
      path="/user-details"
      element={<ProtectedRoute element={UserDetails} />}
    />
    <Route
      path="/user-info/:userId"
      element={<ProtectedRoute element={UserDetails} />}
    />
    <Route path="/add-book" element={<ProtectedRoute element={AddBook} />} />
    <Route
      path="/usersToBeCreated"
      element={<ProtectedRoute element={UserToBeCreatedPage} />}
    />
    <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
    <Route path="/book/:id" element={<ProtectedRoute element={SingleBook} />} />
    <Route path="/edit-books" element={<EditBooksDisplay />} />
    <Route path="/edit-book/:id" element={<EditBook />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes;
