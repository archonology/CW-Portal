import * as React from "react";
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


function Footer() {

  // set up useQuery get the data from the backend
  const { loading, error, data } = useQuery(QUERY_ALL_TOPICS);

  // object to keep the topic data
  const topicData = data?.topics || {};
  // check load time and errors
  if (loading) return "loading";
  if (error) return `Error! ${error}`;

  return (
    <>
      <Navbar bg="dark" variant="dark" className="p-2 pb-3" expand="md" fixed="bottom">
        <Container fluid >
          <Navbar.Brand as={Link} to="/" className=""></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
            placement="end"
            className="bg-dark variant-white"
          >
            <Offcanvas.Header closeButton closeVariant="white">

              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md}`}>
                The Child Welfare Portal
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">

                {/* <Nav.Link href="#top">Return to Top |</Nav.Link> */}

                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link href="https://buy.stripe.com/cN26ox1O4eMkf7ifYY" target={'_blank'} rel={'nonreferrer'}>Donate</Nav.Link>

                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

                <Nav.Link href="https://www.meherdevs.com" target={'_blank'} rel={'nonreferrer'} className="meherdevs">Created by MeherDevs | 2023</Nav.Link>

              </Nav>


            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;