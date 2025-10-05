import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("hopetrack-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    // Mock login - replace with real API call in production
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split("@")[0],
    };
    localStorage.setItem("hopetrack-user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signup = async (email, password, name, role) => {
    // Mock signup
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role,
      name,
    };
    localStorage.setItem("hopetrack-user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem("hopetrack-user");
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
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
