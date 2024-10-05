// src/App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase authentication
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import PostQuestion from "./components/PostQuestion";
import NavigationBar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeContext

function App() {
  const [user, setUser] = useState(null);

  // Check for user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider>
      {/* Wrap the entire app with ThemeProvider to provide theme context */}
      <Router>
        <NavigationBar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post-question" element={<PostQuestion />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />{" "}
          {/* Set Home as default route */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
