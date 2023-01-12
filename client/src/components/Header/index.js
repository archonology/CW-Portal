import * as React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import ResourceList from "../ResourceList";

console.log(ResourceList[0].title);

function Header() {
    return (
        <>
          <Navbar bg="dark" variant="dark" className="mb-3 p-3" expand="md">
            <Container fluid >
              <Navbar.Brand as={Link} to="/" className="">Public Child Welfare Portal</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md}`}  />
              <Navbar.Offcanvas 
                id={`offcanvasNavbar-expand-md}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
                placement="end"
                className="bg-dark variant-dark"
              >
                {/* can I change the color of the X button? */}
                <Offcanvas.Header closeButton >
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md}`}>
                    Public Child Welfare Portal
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavDropdown 
                      title="Resources"
                      id={`offcanvasNavbarDropdown-expand-md}`}
                    >
                      {ResourceList.map((resource) => (
                      <NavDropdown.Item as={Link} key={resource} to={"/resources" + resource.url}>{resource.title}</NavDropdown.Item>
                      ))};
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action22">
                        something added?
                      </NavDropdown.Item> */}
                    </NavDropdown>
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    <Nav.Link as={Link} to="/donate">Donate</Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button className="search">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
      </>
    );
}

export default Header;