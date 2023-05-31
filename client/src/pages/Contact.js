import React, { useState, useRef } from 'react';
import { validateEmail } from '../utils/helpers';
import emailjs from '@emailjs/browser';
import { Grid, Button, TextField, Box, Container } from "@mui/material";


function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const form = useRef();


    const handleInputChange = (e) => {

        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'name') {
            setName(inputValue);
        } else {
            setMessage(inputValue);
        }
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();

        // First check to see if the email is not valid or if the name is empty. If so, set an error message to be displayed on the page.
        if (!validateEmail(email) || !name) {
            setErrorMessage(`
      Sorry, ${name}, 
      the email is missing something. 
      Please check it and try again, 
      thanks! 🪴
      `);
            return;
    
        }

        setName('');
        setEmail('');
        setMessage('');
        emailjs.sendForm('service_8vauvgr', 'template_favgkfg', form.current, '5oouP9wFVBIv7Jaue')

        alert(`
      Thanks for your message, ${name}! 
      we'll be in touch soon. 🌿
      - Heidi & Reed
      `);
    };


    return (

        <div>

            <Container className="p-5 contact">
                <h2>Contact Us</h2>
                <p>Please share your feedback or let us know if you see an error or a bad link somewhere in the site.</p>
                {errorMessage && (
                    <div>
                        <p className="error-text">{errorMessage}</p>
                    </div>
                )}
                <hr></hr>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
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
                                ref={form}
                                sx={{
                                    "& .MuiTextField-root": { m: 1, minWidth: "300px", }
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleFormSubmit}
                            >
                                <div>
                                    <TextField
                                        id="contact-name-input"
                                        label="Name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="contact-email-input"
                                        label="Email"
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="contact-message-input"
                                        label="Message"
                                        type="text"
                                        name="message"
                                        value={message}
                                        onChange={handleInputChange}
                                        multiline
                                        maxRows={20}
                                    />
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        sx={{ m: 1 }}
                                    >Send
                                    </Button>
                                </div>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Container>

            <script type="text/javascript"
                src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
            </script>
            <script type="text/javascript">
                (function() {
                    emailjs.init("5oouP9wFVBIv7Jaue")
                })();
            </script>

        </div>


    );
};


export default Contact;
