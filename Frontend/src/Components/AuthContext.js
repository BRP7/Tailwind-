import React, { createContext, useState, useEffect } from "react";

// Create context for authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(user ? true : false);
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } else {
      localStorage.setItem("user", JSON.stringify({ name: "John" }));
      setIsLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLoginLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
