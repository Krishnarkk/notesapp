// src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // On mount, check the localStorage for the saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className =
      savedTheme === "light" ? "light-mode" : "dark-mode"; // Set body class based on theme
  }, []);

  // Toggle the theme and store it in localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme === "light" ? "light-mode" : "dark-mode"; // Apply the class to body
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
