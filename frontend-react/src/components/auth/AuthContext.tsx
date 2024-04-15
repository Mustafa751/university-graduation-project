import React, { createContext, useContext, useState } from "react";
import { AuthContextType } from "../interfaces/userInterfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const dummyUser = {
  username: "testuser",
  password: "password123",
  role: "user", // or 'admin' if you want admin access
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  const login = (username: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      // Simulate an API call with a timeout
      setTimeout(() => {
        if (username === "admin" && password === "admin") {
          // Example credentials
          setIsLoggedIn(true);
          setUserRole("admin");
          resolve();
        } else if (
          username === dummyUser.username &&
          password === dummyUser.password
        ) {
          setIsLoggedIn(true);
          setUserRole(dummyUser.role);
          resolve();
        } else {
          reject("Invalid username or password");
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
