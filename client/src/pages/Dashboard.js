import React from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Auth from "../utils/auth";
import Favorites from "../components/Favorites";
import UserLinks from "../components/UserQuickLinks";
import { Link } from 'react-router-dom';
import { Grid } from "@mui/material";
import ToDo from "../components/ToDo";
import Doing from "../components/Doing";
import Done from "../components/Done";
import Container from 'react-bootstrap/Container';
import FavoriteIcon from "@mui/icons-material/Favorite";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';

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


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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
            <Grid container spacing={1}  justifyContent="center">

              <Grid item lg={10}>
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