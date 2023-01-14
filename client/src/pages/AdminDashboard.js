import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Auth from "../utils/auth";
import ResourceCard from "../components/Cards";

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
        <Box sx={{ p: 3 }}>
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

const AdminDashboard = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          sx={{ m: 3, alignItems: "center" }}
          // variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          aria-label="Dashboard List Tabs">
          <Tab label="Favorites" {...a11yProps(0)} />
          <Tab label="To-Do" {...a11yProps(1)} />
          <Tab label="Doing" {...a11yProps(2)} />
          <Tab label="Done" {...a11yProps(3)} />
          <Tab label="Manage Site Build" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ResourceCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <ResourceCard /> */}
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard;