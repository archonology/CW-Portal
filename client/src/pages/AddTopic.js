import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TOPIC } from "../utils/mutations";
import {
    Container,
    TextField,
    Box,
    Autocomplete,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import Auth from "../utils/auth";

const AddTopic = () => {

    Auth.adminLoggedIn() ? Auth.getAdminToken() : window.location.assign('/');

    const [titleInput, setTitleInput] = useState("");
    const [urlInput, setUrlInput] = useState("");
    const [textInput, setTextInput] = useState("");
    const [imageInput, setImageInput] = useState("");
    const [formState, setFormState] = useState({
        title: "",
        url: "",
        text: "",
        image: ""
    });

    const [createTopic, { error, data }] = useMutation(CREATE_TOPIC);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await createTopic({
                variables: { ...formState }
            });
            // directs back to content creator on submission
            window.location.assign('/contentcreator');

        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            <Container sx={{ marginTop: "10em" }}>
                <h2>Create a New Topic</h2>
                <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    noValidate
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { sm: "1fr" },
                        gap: 3,
                        marginBottom: "3em",
                        justify: "center",
                        alignItems: "center",
                    }}
                >
                    {/* user sets title, text, url, image */}
                    <TextField
                        name="titleInput"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        onBlur={() => setTitleInput(titleInput.trim())}
                        label="Topic Title"
                        id="titleName"
                        variant="standard"
                    ></TextField>

                    <TextField
                        name="urlInput"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        onBlur={() => setUrlInput(urlInput.trim())}
                        label="Browser Url"
                        id="urlName"
                        variant="standard"
                    ></TextField>

                    <TextField
                        name="textInput"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onBlur={() => setTextInput(textInput.trim())}
                        label="Description"
                        id="description"
                        multiline
                        maxRows={10}
                        variant="standard"
                    ></TextField>

                </Box>
            </Container>
        </>
    );
}

export default AddTopic;