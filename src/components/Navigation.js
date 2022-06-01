import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { Questions, Create } from "../Utility/RouteConsts.js";
import { useLazyLoadQuery } from "react-relay";
import contentTypeQuery from "../services/queries/contentTypeQuery";
import { useStoreActions } from "easy-peasy";

function Navigation() {
  const username = UserService.getUsername();
  const contentData = useLazyLoadQuery(contentTypeQuery, {
    fetchPolicy: "store-or-network",
  });
  const setContentDataAction = useStoreActions(
    (actions) => actions.setContentDataAction
  );
  setContentDataAction(contentData.contentTypes);
  const navigate = useNavigate();

  const redirectToAskQuestionPage = () => {
    navigate(`/${Questions}/${Create}`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Template
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {/* <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink> */}
            <NavLink to="/questions" className="nav-link">
              Questions
            </NavLink>
            <button
              className="btn btn-outline-secondary text-white"
              type="button"
              id="askQuestionNavBtn"
              onClick={redirectToAskQuestionPage}
            >
              Ask Question
            </button>
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
