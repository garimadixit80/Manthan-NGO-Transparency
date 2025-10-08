import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Base URL for the API
  const BASE_URL = "http://localhost:5000/api/auth";

  // Check for stored user on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("hopetrack-user");
    if (storedUser) {
      // Ensure it's valid JSON before setting state
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // Clear storage if parsing fails (corrupted data)
        localStorage.removeItem("hopetrack-user");
        localStorage.removeItem("hopetrack-token");
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email, password, role) => {
    try {
      const endpoint = role === "admin" ? `${BASE_URL}/login/admin` : `${BASE_URL}/login/user`;
      // API call
      const { data } = await axios.post(endpoint, { email, password });

      // Store user object and token from API response
      localStorage.setItem("hopetrack-user", JSON.stringify(data));
      localStorage.setItem("hopetrack-token", data.token);
      // Update state, which should trigger re-renders in consuming components
      setUser(data);

      return data; // success, returns data to calling component for navigation
    } catch (err) {
      // Throw error to be caught by the calling component
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // Signup function
  const signup = async (email, password, name, role) => {
    try {
      let endpoint, body;
      if (role === "admin") {
        endpoint = `${BASE_URL}/register/admin`;
        body = { organization: name, email, password };
      } else {
        endpoint = `${BASE_URL}/register/user`;
        body = { name, email, password };
      }

      // API call
      const { data } = await axios.post(endpoint, body);

      // Store user object and token from API response
      localStorage.setItem("hopetrack-user", JSON.stringify(data));
      localStorage.setItem("hopetrack-token", data.token);
      // Update state
      setUser(data);

      return data; // success, returns data to calling component for navigation
    } catch (err) {
      // Throw error to be caught by the calling component
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("hopetrack-user");
    localStorage.removeItem("hopetrack-token"); // Ensure token is also removed
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};