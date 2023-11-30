import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";


function Footer() {


  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  return (
    <>
      <Navbar variant="dark" className="p-3 footer" expand="md" fixed="bottom">
        <Container fluid >
          <Navbar.Brand as={Link} to="/" className="p-2"></Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-md}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
            placement="end"
            className="variant-white in-footer"
          >
            <Offcanvas.Header closeButton closeVariant="white">

              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md}`}>
                The Child Welfare Portal
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3">

                {/* <Nav.Link href="#top">Return to Top |</Nav.Link> */}
                {Auth.adminLoggedIn() ? (

                  <>
                    <Nav.Link
                      as={Link}
                      to="/contentcreator" className="creator"
                      onClick={show}
                    >Content Creator</Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/"
                      onClick={Auth.adminLogout} className="logging"
                    >Admin Logout</Nav.Link>

                  </>
                ) : (
                  <>

                  </>
                )}

                <Nav.Link
                  as={Link}
                  to="/about"
                  onClick={show}
                >About</Nav.Link>
                {/* <Nav.Link href="https://buy.stripe.com/cN26ox1O4eMkf7ifYY" target={'_blank'} rel={'nonreferrer'}>Donate</Nav.Link> */}

                <Nav.Link
                  as={Link}
                  to="/contact"
                  onClick={show}
                >Contact</Nav.Link>

te

              </Nav>


            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;