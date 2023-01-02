import * as React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
    return (
        <>
          <Navbar bg="white" variant="light" className="mb-3 p-3" expand="md">
            <Container fluid>
              <Navbar.Brand href="#" className="">Child Welfare Portal</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md}`}  />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-md}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
                placement="end"
              >
                <Offcanvas.Header closeButton >
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md}`} >
                    Child Welfare Portal
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Dashboard</Nav.Link>
                    <Nav.Link href="#action2">Login</Nav.Link>
                    <Nav.Link href="#action2">Donate</Nav.Link>
                    <NavDropdown
                      title="Resources"
                      id={`offcanvasNavbarDropdown-expand-md}`}
                    >
                      <NavDropdown.Item href="#action3">ICWA</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Social Work Code of Ethics</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Data Privacy</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">History</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Advocacy</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Domestic Violence</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Abuse</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Substance Use Disorder</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Education Neglect and Truancy</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">The Court System & CHIPS</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Child Protection & the Law</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Incarceration</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Mental Health</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Parenting Resources</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Case Planning</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Interviewing</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Foster Care in MN</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">SSIS & Data Systems</NavDropdown.Item>
                      <NavDropdown.Item href="#action3">Title IV-E</NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item> */}
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
      </>
    );
}

export default Header;