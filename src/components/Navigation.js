import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import UserService from "../services/UserService";

function Navigation() {
  const username = UserService.getUsername();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Template</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/questions" className="nav-link">
              Questions
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title={username}>
              <Link to="/settings" className="dropdown-item">
                Settings
              </Link>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  UserService.doLogout();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
