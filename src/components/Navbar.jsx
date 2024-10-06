import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { auth } from "../firebase"; // Import Firebase auth
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext
import "./Navbar.css"; // Custom CSS for animations and styling

const NavigationBar = ({ user, onLogout }) => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function from context

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onLogout();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Navbar
      bg={theme === "light" ? "light" : "dark"}
      variant={theme === "light" ? "light" : "dark"}
      expand="lg"
      className="sticky-navbar shadow-sm"
    >
      <Navbar.Brand as={Link} to="/" className="navbar-brand">
        Satvik's App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/post-question">
            Add Question
          </Nav.Link>
        </Nav>
        <Nav className="d-flex align-items-center">
          <Form.Check
            type="switch"
            id="theme-switch"
            label={theme === "light" ? "🌞" : "🌙"}
            onChange={toggleTheme}
            checked={theme === "dark"}
            className="me-3 theme-switch"
          />
                 </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
