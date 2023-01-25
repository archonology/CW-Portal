import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid, Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import { validateEmail, validatePassword } from '../utils/helpers';
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

const Signup = () => {
    const [signupFormData, setSignupFormData] = useState({ username: "", email: "", password: "" });
    const [createUser, { error, data }] = useMutation(CREATE_USER);
    const [value, setValue] = React.useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // update state based on signup form input changes
    const handleSignupFormChange = (event) => {
        const { name, value } = event.target;

        setSignupFormData({
            ...signupFormData,
            [name]: value,
        });
    };

    // submit Signup form
    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(signupFormData.email)) {
            setErrorMessage(`
      Sorry, the email is missing something. 
      Please check it and try again, 
      thanks! 🪴
      `);
            return;
        }
        if (!validatePassword(signupFormData.password)) {
            setErrorMessage(`
      Sorry, the password is missing something. 
      Please make sure it starts with a letter, has a number a special character, and is between 6 and 16 characters long... 🪴
      `);
            return;
        }

        try {
            const { data } = await createUser({
                variables: { ...signupFormData },
            });
            console.log(data);
            Auth.login(data.createUser.token);
        } catch (error) {
            console.error(error);
        }
        // clear form values
        setSignupFormData({
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
                    <Tab label="Sign up" {...a11yProps(0)} />
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
                                    "& .MuiTextField-root": { m: 1, minWidth: "300px", }
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSignupSubmit}
                            >
                                {errorMessage && (
                                    <div>
                                        <p className="error-text">{errorMessage}</p>
                                    </div>
                                )}

                                <div>
                                    <TextField
                                        id="signup-username-input"
                                        label="Username"
                                        type="username"
                                        name="username"
                                        autoComplete="current-username"
                                        value={signupFormData.username}
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
                                        value={signupFormData.email}
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
                                        value={signupFormData.password}
                                        onChange={handleSignupFormChange}
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="success"
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

export default Signup;