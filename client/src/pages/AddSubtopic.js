import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SUBTOPIC } from "../utils/mutations";
import {
    Container,
    TextField,
    Box,
    Button,
} from "@mui/material";
import Auth from "../utils/auth";

const AddSubtopic = () => {

    Auth.adminLoggedIn() ? Auth.getAdminToken() : window.location.assign('/');

    const [formState, setFormState] = useState({
        title: "",
        text: "",
        image: "",
        link: ""
    });

    const [newSubtopic, { error, data }] = useMutation(CREATE_SUBTOPIC);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await newSubtopic({
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
            <Container sx={{ marginTop: "2em" }}>
                <h2>Add a New Subtopic</h2>
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
                    <br></br>
        
                    <TextField
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        onBlur={() => { handleChange.title.trim() }}
                        label="Topic Title"
                        id="titleName"
                        variant="standard"
                    ></TextField>

                    <TextField
                        name="text"
                        value={formState.text}
                        onChange={handleChange}
                        label="Description"
                        id="description"
                        multiline
                        maxRows={10}
                        variant="standard"
                    ></TextField>

                    <TextField
                        name="link"
                        value={formState.link}
                        onChange={handleChange}
                        onBlur={() => { handleChange.link.trim() }}
                        label="Resource Link"
                        id="link"
                        variant="standard"
                    ></TextField>

                    <TextField
                        name="image"
                        value={formState.image}
                        onChange={handleChange}
                        onBlur={() => { handleChange.image.trim() }}
                        label="Image URL"
                        id="image"
                        variant="standard"
                    ></TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{ maxWidth: "100px" }}
                    >
                        Add
                    </Button>
                </Box>
            </Container>
        </>
    );
}

export default AddSubtopic;