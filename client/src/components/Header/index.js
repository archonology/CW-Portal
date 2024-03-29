import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import Auth from "../../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_ALL_TOPICS, QUERY_ALL_QUICKLINKS, QUERY_ME } from "../../utils/queries";
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function Header() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // set up useQuery get the data from the backend
  const { loading: topicLoading, error: topicErr, data: topData } = useQuery(QUERY_ALL_TOPICS);

  // object to keep the topic data
  const topicData = topData?.topics || [];

  const { loading: quickLoading, error: quickErr, data: quickData } = useQuery(QUERY_ALL_QUICKLINKS);

  const quickLinkData = quickData?.quicklinks || [];

  const { loading: userLoading, error: userErr, data: userData } = useQuery(QUERY_ME);

  const userLinkData = userData?.me || [];

  return (
    <>
      <Navbar variant="dark" className="mb-2 p-3 navbar" expand="md" id="#top" fixed='top'>
        <Container fluid >

          <Navbar.Brand as={Link} to="/" className="brand">The Child Welfare Portal</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className='p-3' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">

              <Nav.Link onClick={handleShow}>Topics</Nav.Link>
              <Nav.Link onClick={handleShow2}>Quick Links</Nav.Link>
              <Nav.Link as={Link} to="/search" onClick={show}>Search</Nav.Link>

              {Auth.loggedIn() ? (

                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={Auth.logout} className="logging" >Logout</Nav.Link>

                </>
              ) : (
                <>
                    <Nav.Link as={Link} to="/login" onClick={show}>Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/login" className="logging" onClick={show}>Login</Nav.Link>

                </>
              )}

            </Nav>
          </Navbar.Collapse>


          <Offcanvas show={show} onHide={handleClose} className="bg-dark variant-white" placement="end">
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Topics</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

              {topicData.map((topic, index) => (

                <>

                  <Dropdown key={topic._id} as={ButtonGroup}>

                    {index % 2 === 0 ?
                      <Nav.Link
                        key={topic._id}
                        as={Link}
                        to={`/resources/${topic._id}`}
                        className="topics p-2"
                        variant='dark'
                        onClick={show}
                      >{topic.title}
                      </Nav.Link>
                      :
                      <Nav.Link
                        key={topic._id}
                        as={Link}
                        to={`/resources/${topic._id}`}
                        className="topics2 p-2"
                        variant='dark'
                        onClick={show}
                      >{topic.title}
                      </Nav.Link>
                    }

                    <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
                    <Dropdown.Menu variant='dark' className='p-3'>
                      {topic.subtopics.map((subtopic) => {
                        return (
                          <>
                            <Dropdown.Item key={subtopic._id} as={Link} to={`/resources/${topic._id}`} className="subtopics" >{subtopic.title}</Dropdown.Item>
                          </>
                        )

                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                  <hr></hr>
                </>

              ))}

            </Offcanvas.Body>
          </Offcanvas>

          <Offcanvas show={show2} onHide={handleClose2} className="bg-dark variant-white" placement="end">
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Quick Links</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {Auth.loggedIn() ? (
                <>
                  <h4>Your custom links:</h4>
                  <br />
                  {userLinkData.userQuickLinks?.map((link, index) => (
                    <>
                      {index % 2 === 0 ? <Nav.Link key={link._id} href={link.link} target={'_blank'} rel={'nonreferrer'} className="quicklinkMe">{link.title}</Nav.Link> : <Nav.Link key={link._id} href={link.link} target={'_blank'} rel={'nonreferrer'} className="quicklinkMe2">{link.title}</Nav.Link>}

                      <hr></hr>
                    </>
                  ))}
                  <h4>Standard links:</h4>
                  <br />
                </>
              ) : (<></>)}
              {quickLinkData.map((quicklink, index) => (

                <>
                  {index % 2 === 0 ? <Nav.Link key={quicklink._id} href={quicklink.link} target={'_blank'} rel={'nonreferrer'} className="quicklink">{quicklink.title}</Nav.Link> : <Nav.Link key={quicklink._id} href={quicklink.link} target={'_blank'} rel={'nonreferrer'} className="quicklink2">{quicklink.title}</Nav.Link>}

                  <hr></hr>
                </>
              ))}

            </Offcanvas.Body>
          </Offcanvas>

        </Container>
      </Navbar>
    </>
  );
}

export default Header;