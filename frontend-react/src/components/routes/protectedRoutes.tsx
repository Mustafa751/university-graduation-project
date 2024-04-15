import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Adjust this import as necessary

// Define your own props, specifying the component type directly
interface ProtectedRouteProps {
  element: React.ComponentType;
  path?: string;  // Include any props you need for routing
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component, path }) => {
  const { isLoggedIn } = useAuth();

  // Function to render the component or redirect based on auth status
  const render = () => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace state={{ from: path }} />;
    }
    return <Component />;
  };

  // Return a Route component if using path, otherwise just render the output directly
  return path ? <Route path={path} element={render()} /> : render();
};

export default ProtectedRoute;
