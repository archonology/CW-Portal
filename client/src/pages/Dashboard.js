import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Auth from "../utils/auth";
import Favorites from "../components/Favorites";
import UserLinks from "../components/UserQuickLinks";
import { Link } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import ToDo from "../components/ToDo";
import Doing from "../components/Doing";
import Done from "../components/Done";
import Container from 'react-bootstrap/Container';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CREATE_USER_QUICKLINK } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, mt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {

  const [createUserQuickLink] = useMutation(CREATE_USER_QUICKLINK, {
    refetchQueries: [{ query: QUERY_ME }]
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [linkTitle, setLinkTitle] = useState('');
  const [linkAddress, setLinkAddress] = useState('');

  const handleInputChange = (e) => {
    let { target } = e;
    let inputType = target.name;
    let inputValue = target.value;
    console.log(inputValue);

    if (inputType === 'linkTitle') {
      setLinkTitle(inputValue);
    } else if (inputType === 'linkAddress') {
      setLinkAddress(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleClose();

    console.log('hello?');
    try {
      const { data } = await createUserQuickLink({
          variables: {
            title: linkTitle,
            link: linkAddress }
        });
      setLinkTitle('');
      setLinkAddress('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Container fluid className="text-center p-5 mt-3 box">
        
        <h4>Welcome to your dashboard!</h4>
        <p className="">While you're logged in you have access to your favorites and progess lists. Simply click the  <FavoriteIcon sx={{ color: "#f6685e" }} /> <span className="">heart</span> to add to favorites, the <LooksOneIcon sx={{ color: "#ffcd38" }} /> one button to add to <span className="one">To-do</span> , the <LooksTwoIcon sx={{ color: "#33bfff" }} /> two button to add to <span className="two">Doing</span>, and the <Looks3Icon sx={{ color: "#ff9800" }} /> three button to add to <span className="three">Done</span>. Click the button again to remove it from a list.</p>
      </Container>
      <Box sx={{ width: '100%' }}>
        <Box>
          {Auth.adminLoggedIn() ? (
            <Tabs
              sx={{ alignContent: "center" }}
              // variant="fullWidth"
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable Dashboard List Tabs"
              indicatorColor="secondary">
              <Tab label="Content Creator" {...a11yProps(4)} as={Link} to="/contentcreator" className="link3" sx={{ color: "#eceff1", textDecoration: "none", fontWeight: "bold" }} />

            </Tabs>) : (
            <Tabs
              sx={{}}
              // variant="fullWidth"
              value={value}
              onChange={handleChange}
              textColor="inherit"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable Dashboard List Tabs"
              indicatorColor="primary">
                <Tab label="Favorites" {...a11yProps(0)} />
                <Tab label="Quick Links" {...a11yProps(1)} />
              <Tab label="To-Do" {...a11yProps(2)} />
              <Tab label="Doing" {...a11yProps(3)} />
              <Tab label="Done" {...a11yProps(4)} />
            </Tabs>
          )}
        </Box>
        <TabPanel value={value} index={0}>
          <Grid direction="row" container sx={{ padding: "1rem" }}>
            <Grid container spacing={0} justifyContent="center">

              <Favorites />

            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid direction="row" container sx={{ padding: "1rem" }}>
            <Grid container spacing={0} justifyContent="center">

              <Button variant="primary" onClick={handleShow}>
                Create a Custom Quick Link
              </Button>

              <Modal show={show} onHide={handleClose} className="modal">
                <Modal.Header className="modalForm">
                  <Modal.Title>Custom Quick Link</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modalForm">
                  <Form
                    
                   
                  >
                    <Form.Group className="mb-3" controlId="form.ControlInput1">
                      <Form.Label>Quick Link Title</Form.Label>
                      <Form.Control
                        type="title"
                        name="linkTitle"
                        value={linkTitle}
                        onChange={handleInputChange}
                        placeholder="Title"
                        autoFocus
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="form.link"
                    >
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        type="link"
                        name="linkAddress"
                        value={linkAddress}
                        onChange={handleInputChange}
                        placeholder="Link address"
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer className="modalForm">
                  <Button
                    variant="contained"
                    color='error'
                    sx={{ m: 1 }}
                    onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleFormSubmit}
                    type="submit"
                    id="submit"
                    value='submit'
                  >
                    Save Quick Link
                  </Button>
                </Modal.Footer>
              </Modal>

              <Grid container spacing={0} justifyContent="center" className="userLinks">
   
                <UserLinks />

              </Grid>
          

            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>

          <Grid direction="row" container sx={{ padding: "1rem" }}>
            <Grid container spacing={0} justifyContent="center">

              <ToDo />

            </Grid>
          </Grid>

        </TabPanel>
        <TabPanel value={value} index={3}>

          <Grid direction="row" container sx={{ padding: "1rem" }}>
            <Grid container spacing={0} justifyContent="center">

              <Doing />

            </Grid>
          </Grid>

        </TabPanel>
        <TabPanel value={value} index={4}>

          <Grid direction="row" container sx={{ padding: "1rem" }}>
            <Grid container spacing={0} justifyContent="center">

              <Done />

            </Grid>
          </Grid>

        </TabPanel>
      </Box>


    </>
  );
};

export default Dashboard;