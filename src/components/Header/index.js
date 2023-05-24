import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Auth from "../../utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./header.css";
import logo from "../../assets/delishia12.png"

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
      <header>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div xs={12} md={6}>
              <Link className="page-title" to="/">
                <img
                  src={logo}
                  alt="delishia"
                  className="img-fluid"
                  width={150}
                />
              </Link>
            </div>
            <div xs={12} md={4}>
              <Navbar expand="md">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="md-auto ">
                    {Auth.loggedIn() ? (
                      <>
                        <Nav.Link as={Link} to="/" className="link">
                          Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/search" className="link ">
                          Recipes
                        </Nav.Link>
                        <Nav.Link as={Link} to="/me" className="link profiles ">
                          <FaUser size={20} />{" "}
                          <span>{Auth.getProfile().data.username}</span>
                        </Nav.Link>
                        <Nav.Link onClick={logout} className="link">
                          Logout
                        </Nav.Link>
                      </>
                    ) : (
                      <>
                        <Nav.Link as={Link} to="/" className="link">
                          Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/search" className="link">
                          Recipes
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login" className="link">
                          <IoIosArrowForward />
                          Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup" className="link sign">
                          Sign up
                        </Nav.Link>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
        </Container>
      </header>
  );
};

export default Header;
