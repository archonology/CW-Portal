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
import { QUERY_ALL_TOPICS, QUERY_ALL_QUICKLINKS } from "../../utils/queries";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ClassNames } from '@emotion/react';
import { Autocomplete, TextField, Box } from '@mui/material';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Topic from '../Topic';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginTop: 3,
  width: '35%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Header() {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [searchInput, setSearchInput] = useState('');

  // set up useQuery get the data from the backend
  const { loading: topicLoading, error: topicErr, data: topData } = useQuery(QUERY_ALL_TOPICS);

  // object to keep the topic data
  const topicData = topData?.topics || [];

  // initialize topics object for autosearch feature in navbar
  const topics = topicData.map((topic) => {
    return (
      { label: topic.title, _id: topic._id }
    )
  })

  const handleSearch = async (event, topic) => {
    event.preventDefault();
console.log(topic)
    window.location.assign(`/resources/${topic._id}`)
  }
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  // };

  // if (searchInput.length > 0) {
  //   topics.filter((topic) => {
  //     return topic.title.match(searchInput);
  //   });
  // }

  const { loading: quickLoading, error: quickErr, data: quickData } = useQuery(QUERY_ALL_QUICKLINKS);

  const quickLinkData = quickData?.quicklinks || [];



  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-2 p-4" expand="md" id="#top">
        <Container fluid >

          <Navbar.Brand as={Link} to="/" className="brand">The Child Welfare Portal</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className='p-3' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">


              <Nav.Link onClick={handleShow}>Resources</Nav.Link>
              <Nav.Link onClick={handleShow2}>Quick Links</Nav.Link>

              {Auth.loggedIn() || Auth.adminLoggedIn() ? (

                <>
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/" onClick={Auth.logout} className="logging" >Logout</Nav.Link>

                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Dashboard</Nav.Link>
                  <Nav.Link as={Link} to="/login" className="logging">Login</Nav.Link>


                  {/* <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={handleChange}
                      value={searchInput}
                    />
                    <Dropdown.Menu variant='dark'>
                      {topics.map((topic, index) => {
                        <Dropdown.Item key={index}>{topic.title}</Dropdown.Item>
                      })}

                    </Dropdown.Menu>
                  </Search> */}
                  <Box
                    component='form'
                    noValidate
                    onSubmit={handleSearch}>
                    <Autocomplete
                      id="resource-search"
                      sx={{ width: 200, marginLeft: 2 }}
                      options={topics}
                      value={topics._id}
                      autoHighlight
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                          {option.label}

                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Resources"
                          color='success'
                          variant='outlined'
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />

                   {/* <Button type='submit' className='search m-2'>submit</Button> */}
                  </Box>


                  {/* <div>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="bg-black searchbox text-white"
                        aria-label="Search"
                        onChange={handleChange}
                        value={searchInput}
                      />
                      <Button className="search">
                        <SearchIcon></SearchIcon>
                      </Button>
                    </Form>
                  </div> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>


          <Offcanvas show={show} onHide={handleClose} className="bg-dark variant-white" placement="end">
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title>Resources</Offcanvas.Title>
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
                      >{topic.title}
                      </Nav.Link>
                      :
                      <Nav.Link
                        key={topic._id}
                        as={Link}
                        to={`/resources/${topic._id}`}
                        className="topics2 p-2"
                        variant='dark'
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
              {quickLinkData.map((quicklink, index) => (

                <>
                  {index % 2 === 0 ? <Nav.Link key={quicklink._id} href={quicklink.link} target={'_blank'} rel={'nonreferrer'} className="quicklink">{quicklink.title}</Nav.Link> : <Nav.Link key={quicklink._id} href={quicklink.link} target={'_blank'} rel={'nonreferrer'} className="quicklink2">{quicklink.title}</Nav.Link>}

                  <hr></hr>
                </>
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