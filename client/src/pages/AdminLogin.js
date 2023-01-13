import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Button, Link, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { LOGIN_ADMIN, CREATE_ADMIN } from "../utils/mutations";
import Auth from "../utils/auth";

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

const AdminLogin = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [loginAdmin, { error, data }] = useMutation(LOGIN_ADMIN);
    const [createAdmin, { err, data2 }] = useMutation(CREATE_ADMIN);
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
            const { data } = await loginAdmin({
                variables: { ...formState },
            });

            Auth.login(data.loginAdmin.admin.token);
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
            const { data2 } = await createAdmin({
                variables: { ...formState },
            });

            Auth.login(data2.createAdmin.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs
                    sx={{ m: 3 }}
                    value={value}
                    onChange={handleChange}
                    aria-label="Admin login and sign up tabs"
                    textColor="secondary"
                    indicatorColor="secondary">
                    <Tab label="Admin Login" {...a11yProps(0)} />
                    <Tab label="Admin Sign up" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="right"
                    justifyContent="right"
                    style={{ minHeight: "25vh" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            color: "#fff",
                        }}
                    >
                        <Grid item>
                            <Box
                                component="form"
                                sx={{
                                    "& .MuiTextField-root": { m: 1, minWidth: "300px", },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleLoginSubmit}
                            >
                                <div>
                                    <TextField
                                        id="login-email-input"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        autoComplete="current-email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="login-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        // sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                                        value={formState.password}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <Button                                     
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{m: 1}}>Admin Login</Button>
                                </div>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="right"
                    justifyContent="right"
                    style={{ minHeight: "25vh" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            color: "#fff",
                        }}
                    >
                        <Grid item>
                            <Box
                                component="form"
                                sx={{
                                    "& .MuiTextField-root": { m: 1, minWidth: "300px", }
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSignupSubmit}
                            >
                                <div>
                                    <TextField
                                        id="signup-username-input"
                                        label="Username"
                                        type="username"
                                        name="username"
                                        autoComplete="current-username"
                                        value={formState.username}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="signup-email-input"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        autoComplete="current-email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="signup-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        // sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                                        value={formState.password}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{m: 1}}
                                    >Admin Sign Up
                                    </Button>
                                </div>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </TabPanel>
        </Box>
    );
};

export default AdminLogin;