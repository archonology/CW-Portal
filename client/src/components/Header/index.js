import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TOPICS } from "../../utils/queries";



function Header() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // set up useQuery get the data from the backend
  const { loading, error, data } = useQuery(QUERY_ALL_TOPICS);

  // object to keep the topic data
  const topicData = data?.topics || {};
  // check load time and errors
  if (loading) return "loading";
  if (error) return `Error! ${error}`;

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-2 p-4" expand="md" id="#top">
        <Container fluid >

          <Navbar.Brand as={Link} to="/" className="brand">The Child Welfare Portal</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav"  className='p-3' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">

              <Nav.Link onClick={handleShow}>Resources</Nav.Link>

              {Auth.loggedIn() || Auth.adminLoggedIn() ? (

                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={Auth.logout} className="logging" >Logout</Nav.Link>

                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/login" className="logging">Login</Nav.Link>

                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
            placement="end"
            className="bg-dark variant-white"
          > */}
          {/* <Offcanvas.Header closeButton closeVariant="white">

              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md}`}>
                The Child Welfare Portal
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body> */}
          {/* <Nav className="justify-content-end flex-grow-1 pe-3">

                <NavDropdown
                  menuVariant="dark"
                  title="Resources"
                  id={`offcanvasNavbarDropdown-expand-md}`}
                > */}
          {/* here the resource topics are mapped through to be synced with backend */}
          {/* {topicData.map((topic) => (
                    <NavDropdown.Item as={Link} key={topic._id} to={`/resources/${topic._id}`}>{topic.title} </NavDropdown.Item>
                  ))}
                </NavDropdown> */}

          {/* <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
          {/* <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link href="https://buy.stripe.com/cN26ox1O4eMkf7ifYY" target={'_blank'} rel={'nonreferrer'}>Donate</Nav.Link> */}


          <Offcanvas show={show} onHide={handleClose} className="bg-dark variant-white" placement="end">
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Topics</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {topicData.map((topic) => (
                <ul>
                  <Nav.Link key={topic._id} as={Link} to={`/resources/${topic._id}`}>{topic.title} </Nav.Link>
                </ul>
              ))}

            </Offcanvas.Body>
          </Offcanvas>

          {/* </Nav> */}
          {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-black searchbox text-white"
                  aria-label="Search"
                />
                <Button className="search">
                  <SearchIcon></SearchIcon>
                </Button>
              </Form> */}

          {/* </Offcanvas.Body>
          </Navbar.Offcanvas> */}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;