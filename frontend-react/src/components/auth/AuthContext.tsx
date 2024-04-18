import React, { createContext, useContext, useState } from "react";
import { AuthContextType } from "../interfaces/userInterfaces";
import { sendRequest } from "../hooks/http";
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
        if (
          (username === "admin" && password === "admin") ||
          (username === dummyUser.username && password === dummyUser.password)
        ) {
          setIsLoggedIn(true);
          setUserRole(username === "admin" ? "admin" : dummyUser.role);
          // Fetch the JWT from the server
          sendRequest("http://localhost:8083/jwt")
            .then((data: { jwt: string }) => {
              localStorage.setItem("jwtToken", data.jwt); // Assume the response includes a jwt field
              resolve();
            })
            .catch((error: Error) => {
              logout(); // Ensure the user is logged out if JWT fetch fails
              reject(error);
            });
        } else {
          reject("Invalid username or password");
        }
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
