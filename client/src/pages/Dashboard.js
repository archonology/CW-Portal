import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Button, Link, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { CREATE_USER } from "../utils/mutations";
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

const Dashboard = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);
  const [createUser, { err, data2 }] = useMutation(CREATE_USER);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // update state based on form input changes
  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


  // submit Login form
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      Auth.login(data.loginUser.user.token);
    } catch (error) {
      console.error(error);
    }
    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };


  // submit Signup form
  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data2 } = await createUser({
        variables: { ...formState },
      });

      Auth.login(data2.createUser.token);
    } catch (err) {
      console.error(err);
    }
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

export default Dashboard;