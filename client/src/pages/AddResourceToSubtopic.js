import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RESOURCE } from "../utils/mutations";
import { QUERY_ALL_SUBTOPICS } from "../utils/queries";
import {
    Container,
    TextField,
    Box,
    Button,
} from "@mui/material";
import Form from 'react-bootstrap/Form';
import Auth from "../utils/auth";

const AddResourceToSubtopic = () => {
    Auth.adminLoggedIn() ? Auth.getAdminToken() : window.location.assign('/');

    const { loading, error, data } = useQuery(QUERY_ALL_SUBTOPICS);

    const allSubtopics = data?.subtopics || [];


    const [formState, setFormState] = useState({
        title: "",
        text: "",
        image: "",
        link: "",
        doc: "",
        docModel: "Subtopic"
    });

    console.log(allSubtopics);

    const [newResource, { err, dat }] = useMutation(CREATE_RESOURCE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { dat } = await newResource({
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
                <h2>Add a New Resource</h2>
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

                    {/* select the specific title or subtitle */}
                    <Form.Select
                        aria-label="select topic"
                        name="doc"
                        onChange={handleChange}
                        className="bg-dark variant-white text-white"
                    >
                        <option className="variant-white">Add to which Subtopic:</option>
                        {allSubtopics.map((subtopic) => {
                            return (
                                <>
                                    <option value={subtopic._id}>{subtopic.title}</option>
                                </>
                            )
                        })}
                    </Form.Select>

                    {/* user sets title, text, url, image */}
                    <TextField
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        onBlur={() => { handleChange.title.trim() }}
                        label="Resource Title"
                        id="titleName"
                        variant="standard"
                    ></TextField>

                    <TextField
                        name="text"
                        value={formState.text}
                        onChange={handleChange}
                        label="Resource Description"
                        id="description"
                        multiline
                        maxRows={10}
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

                    <TextField
                        name="link"
                        value={formState.link}
                        onChange={handleChange}
                        onBlur={() => { handleChange.link.trim() }}
                        label="Resource Link"
                        id="link"
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

export default AddResourceToSubtopic;