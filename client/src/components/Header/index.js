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
              <Navbar.Brand href="#" className="">Public Child Welfare Portal</Navbar.Brand>
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
                    <Nav.Link href="#action1">Dashboard</Nav.Link>
                    <Nav.Link href="#action2">Login</Nav.Link>
                    <Nav.Link href="#action3">Contact</Nav.Link>
                    <Nav.Link href="#action3">Donate</Nav.Link>
                    <NavDropdown
                      title="Resources"
                      id={`offcanvasNavbarDropdown-expand-md}`}
                    >
                      <NavDropdown.Item href="#action3">ICWA</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Social Work Code of Ethics</NavDropdown.Item>
                      <NavDropdown.Item href="#action5">Data Privacy</NavDropdown.Item>
                      <NavDropdown.Item href="#action6">History</NavDropdown.Item>
                      <NavDropdown.Item href="#action7">Advocacy</NavDropdown.Item>
                      <NavDropdown.Item href="#action8">Domestic Violence</NavDropdown.Item>
                      <NavDropdown.Item href="#action9">Abuse</NavDropdown.Item>
                      <NavDropdown.Item href="#action10">Substance Use Disorder</NavDropdown.Item>
                      <NavDropdown.Item href="#action11">Education Neglect and Truancy</NavDropdown.Item>
                      <NavDropdown.Item href="#action12">The Court System & CHIPS</NavDropdown.Item>
                      <NavDropdown.Item href="#action13">Child Protection & the Law</NavDropdown.Item>
                      <NavDropdown.Item href="#action14">Incarceration</NavDropdown.Item>
                      <NavDropdown.Item href="#action15">Mental Health</NavDropdown.Item>
                      <NavDropdown.Item href="#action16">Parenting Resources</NavDropdown.Item>
                      <NavDropdown.Item href="#action17">Case Planning</NavDropdown.Item>
                      <NavDropdown.Item href="#action18">Interviewing</NavDropdown.Item>
                      <NavDropdown.Item href="#action19">Foster Care in MN</NavDropdown.Item>
                      <NavDropdown.Item href="#action20">SSIS & Data Systems</NavDropdown.Item>
                      <NavDropdown.Item href="#action21">Title IV-E</NavDropdown.Item>
                      {/* <NavDropdown.Divider />
                      <NavDropdown.Item href="#action22">
                        something added?
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