import React, { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store"; // Import the RootState type from store
import {
  login as loginAction,
  logout as logoutAction,
} from "../../slices/userSlice"; // Import the actions from userSlice
import { AuthContextType, UserResponse } from "../interfaces/userInterfaces"; // Import the AuthContextType
import { SendRequestOptions, sendRequest } from "../hooks/http";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, userRole, userId } = useSelector(
    (state: RootState) => state.user
  );

  const login = (username: string, password: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const requestOptions: SendRequestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fakNumber: username, egn: password }),
      };

      sendRequest<UserResponse>(
        "http://localhost:8089/api/users/login",
        requestOptions,
        navigate,
        logout
      )
        .then((response) => {
          if (response && response.user) {
            const { user } = response;
            dispatch(
              loginAction({
                user,
                userRole: user.role,
                userId: user.id,
              })
            );
            resolve();
          } else {
            reject(new Error("Wrong username or password"));
          }
        })
        .catch((error: Error) => {
          logout();
          reject(error);
        });
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
