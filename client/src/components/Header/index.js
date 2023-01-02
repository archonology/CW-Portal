import * as React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
          <Navbar bg="white" variant="light" className="mb-3 p-3" expand="md">
            <Container fluid>
              <Navbar.Brand as={Link} to="/" className="">Public Child Welfare Portal</Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md}`}  />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-md}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
                placement="end"
              >
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
                      <NavDropdown.Item as={Link} to="/icwa">ICWA</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/ethics">Social Work Code of Ethics</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/dataprivacy">Data Privacy</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/history">History</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/advocacy">Advocacy</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/dv">Domestic Violence</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/abuse">Abuse</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/sud">Substance Use Disorder</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/edneglect">Education Neglect and Truancy</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/court">The Court System & CHIPS</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/cplaw">Child Protection & the Law</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/incarceration">Incarceration in the Family</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/mentalhealth">Mental Health</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/parenting">Parenting Resources</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/caseplanning">Case Planning</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/interviewing">Interviewing</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/fostercare">Foster Care in MN</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/ssis">SSIS & Data Systems</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/iv-e">Title IV-E</NavDropdown.Item>
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