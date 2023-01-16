import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Auth from "../utils/auth";
import ResourceCard from "../components/Resources";
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Grid } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  // const buttons = [
  //   <Button key="one">See</Button>,
  //   <Button key="two">Add Subtopic</Button>,
  //   <Button key="three">Three</Button>,
  // ];

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
    <Box sx={{ width: '100%' }}>
      <div className="m-4">
      <Button
        as={Link}
        className="link"
        to="/contentcreator"
        variant="contained"
        color="warning"
        sx={{ margin: 2, paddingBlock: 1.25, textDecoration: "none", }}>Content Creator
      </Button>
      </div>
      <Box>
        {Auth.adminLoggedIn() ? (
          <Tabs
            sx={{ ml: 1 }}
            // variant="fullWidth"
            value={value}
            onChange={handleChange}
            centered
            textColor="inherit"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable Dashboard List Tabs"
            indicatorColor="secondary">
            <Tab label="Favorites" {...a11yProps(0)} />
            <Tab label="To-Do" {...a11yProps(1)} />
            <Tab label="Doing" {...a11yProps(2)} />
            <Tab label="Done" {...a11yProps(3)} />

          </Tabs>) : (
          <Tabs
            sx={{ ml: 1 }}
            // variant="fullWidth"
            centered
            value={value}
            onChange={handleChange}
            textColor="inherit"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable Dashboard List Tabs"
            indicatorColor="primary">
            <Tab label="Favorites" {...a11yProps(0)} />
            <Tab label="To-Do" {...a11yProps(1)} />
            <Tab label="Doing" {...a11yProps(2)} />
            <Tab label="Done" {...a11yProps(3)} />
          </Tabs>
        )}
      </Box>
      <TabPanel value={value} index={0}>
        <ResourceCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
      <TabPanel value={value} index={3}>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="right">
          <Button
            as={Link}
            to="/"
            variant="contained"
            color="primary"
            className="link"
            sx={{ margin: 1, ml: 3, padding: 1, width: "200px", textAlign: "center", textDecoration: "none", }}>Topics
          </Button>
          <Button
            as={Link}
            to="/"
            variant="contained"
            color="secondary"
            className="link"
            sx={{ margin: 1, ml: 3, padding: 1, width: "200px", textAlign: "center", textDecoration: "none", }}>Subtopics
          </Button>
          <Button
            as={Link}
            to="/"
            variant="contained"
            color="success"
            className="link"
            sx={{ margin: 1, ml: 3, padding: 1, width: "200px", textAlign: "center", textDecoration: "none", }}>Resources
          </Button>
        </Grid>

      </TabPanel>
    </Box>
  );
};

export default Dashboard;