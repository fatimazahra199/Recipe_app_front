import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./footer.css";
import { Row, Col, Navbar, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <Row className="justify-content-center mt-5 align-items-center footer-container">
      <Col xs={12} md={6} className="text-md-left">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Col>
    </Row>
  );
};

export default Footer;
