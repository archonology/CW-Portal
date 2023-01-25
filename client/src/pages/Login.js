import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid, Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from 'react-router-dom';
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
    const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
    const [loginUser, { error, data }] = useMutation(LOGIN_USER);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // update state based on login form input changes
    const handleLoginFormChange = (event) => {
        const { name, value } = event.target;

        setLoginFormData({
            ...loginFormData,
            [name]: value,
        });
    };

    // submit Login form
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await loginUser({
                variables: { ...loginFormData },
            });
            console.log(data);
            Auth.login(data.loginUser.token);
        } catch (error) {
            console.error(error);
        }
        // clear form values
        setLoginFormData({
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
                                        value={loginFormData.email}
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
                                        value={loginFormData.password}
                                        onChange={handleLoginFormChange}
                                    />
                                </div>
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ m: 1 }}>Login
                                    </Button>

                                </div>
                                <div className="mt-3">
                                    <Button
                                        as={Link}
                                        to="/signup"
                                        variant="contained"
                                        color="success"
                                        className="link"
                                        sx={{ margin: 1, paddingBlock: 1.25, textDecoration: "none", }}>Go to Signup Form
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