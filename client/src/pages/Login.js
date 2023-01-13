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

const Login = () => {
    const [loginState, setLoginState] = useState({ email: "", password: "" });
    const [signupState, setSignupState] = useState({ username: "", email: "", password: "" });
    const [loginUser, { error, data }] = useMutation(LOGIN_USER);
    const [createUser, { err, data2 }] = useMutation(CREATE_USER);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // update state based on login form input changes
    const handleLoginFormChange = (event) => {
        const { name, value } = event.target;

        setLoginState({
            ...loginState,
            [name]: value,
        });
    };


    // update state based on signup form input changes
    const handleSignupFormChange = (event) => {
        const { name, value } = event.target;

        setSignupState({
            ...signupState,
            [name]: value,
        });
    };


    // submit Login form
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { ...loginState },
            });

            Auth.login(data.loginUser.user.token);
        } catch (error) {
            console.error(error);
        }
        // clear form values
        setLoginState({
            email: "",
            password: "",
        });
    };


    // submit Signup form
    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data2 } = await createUser({
                variables: { ...signupState },
            });

            Auth.login(data2.createUser.token);
        } catch (err) {
            console.error(err);
        }
        // clear form values
        setSignupState({
            username: "",
            email: "",
            password: "",
        });
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs
                    sx={{ m: 3 }}
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="User login and sign up tabs">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Sign up" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
                                    borderColor: "teal",
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
                                        value={loginState.email}
                                        onChange={handleLoginFormChange}
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
                                        value={loginState.password}
                                        onChange={handleLoginFormChange}
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ m: 1 }}>Login</Button>
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
                                        value={signupState.username}
                                        onChange={handleSignupFormChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="signup-email-input"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        autoComplete="current-email"
                                        value={signupState.email}
                                        onChange={handleSignupFormChange}
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
                                        value={signupState.password}
                                        onChange={handleSignupFormChange}
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{ m: 1 }}
                                    >Sign up
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

export default Login;