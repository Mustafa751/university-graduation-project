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
import BooksPageDisplay from "../books/BooksPage";
import ArticlesPageDisplay from "../books/ArticlesPageDisplay";
import PeriodicalsPageDisplay from "../books/PeriodicalsPageDisplay";
import ReadersPageDisplay from "../books/ReadersPageDisplay";
import Statistics from "../statistics/Statistics";
import GraduationThesesPageDisplay from "../books/GraduationThesesPageDisplay";
import DissertationsPageDisplay from "../books/DissertationsPageDisplay";
import UserBooksDisplay from "../user/UserBooksDisplay";
import EditBooksDisplayWrapper from "../books/EditBooksDisplayWrapper";
import EditBookWrapper from "../books/EditBookWrapper";
import RentOutDisplay from "../rent/RentOutDisplay";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/rentBook" element={<RentOutDisplay />} />
    <Route path="/admin-panel" element={<AdminPanel />} />
    <Route
      path="/user-books/:userId"
      element={<ProtectedRoute element={UserBooksDisplay} />}
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
    <Route
      path="/statistics"
      element={<ProtectedRoute element={Statistics} />}
    />
    <Route path="/book/:id" element={<ProtectedRoute element={SingleBook} />} />
    <Route path="/edit-books" element={<EditBooksDisplayWrapper />} />
    <Route path="/edit-book/:id" element={<EditBookWrapper />} />
    <Route path="/books" element={<BooksPageDisplay />} />
    <Route path="/articles" element={<ArticlesPageDisplay />} />
    <Route path="/periodicals" element={<PeriodicalsPageDisplay />} />
    <Route path="/readers" element={<ReadersPageDisplay />} />
    <Route
      path="/graduation-theses"
      element={<GraduationThesesPageDisplay />}
    />
    <Route path="/dissertations" element={<DissertationsPageDisplay />} />
    {/* Add more routes as needed */}
  </Routes>
);

export default AppRoutes;
