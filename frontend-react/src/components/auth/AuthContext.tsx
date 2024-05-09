import React, { createContext, useContext, useState } from "react";
import { AuthContextType } from "../interfaces/userInterfaces";
import { ApiResponse, SendRequestOptions, sendRequest } from "../hooks/http";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const dummyUser = {
  username: "testuser",
  password: "password123",
  role: "user", // Change to 'admin' for admin access
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const login = (username: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const requestOptions: SendRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fakNumber: username, egn: password }),
        };

        sendRequest("http://localhost:8089/api/users/login", requestOptions)
          .then((response: ApiResponse) => {
            if (response) {
              // Assuming ApiResponse has a role or other user info you might use
              setIsLoggedIn(true);
              setUserRole(username === "admin" ? "admin" : dummyUser.role); // Example setup
              resolve();
            } else {
              reject(new Error("Wrong username or password"));
            }
          })
          .catch((error: Error) => {
            logout();
            reject(error);
          });
      }, 1000);
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
