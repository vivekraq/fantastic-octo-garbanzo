import React, { useState, useEffect } from "react";
import api from "./api";

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          // Verify session with backend
          const response = await api.get("/user");
          if (response.status === 200) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          } else {
            throw new Error("Session verification failed");
          }
        } catch (error) {
          console.log(
            "Session verification failed, but keeping user data:",
            error
          );
          // Don't clear localStorage immediately, just set unauthenticated state
          // This allows the user to try logging in again without losing their data
          setUser(null);
          setIsAuthenticated(false);
          // Optionally clear localStorage after a delay or on logout
        }
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await api.post("/login", {
        username,
        password,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error };
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
