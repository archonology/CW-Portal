import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SUBTOPIC } from "../utils/mutations";
import { QUERY_ALL_TOPICS } from "../utils/queries";
import {
    Container,
    TextField,
    Box,
    Button,
} from "@mui/material";
import Auth from "../utils/auth";

import Form from 'react-bootstrap/Form';





const AddSubtopic = () => {
    Auth.adminLoggedIn() ? Auth.getAdminToken() : window.location.assign('/');

    const { loading, err, data } = useQuery(QUERY_ALL_TOPICS);

    const topicData = data?.topics || [];

    console.log(topicData);

    const [formState, setFormState] = useState({
        title: "",
        text: "",
        doc: "",
        docModel: "Topic"
    });

    const [newSubtopic, { error, dat }] = useMutation(CREATE_SUBTOPIC);
    const [topic, setTopic] = React.useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;

        console.log(name, value);

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleValueChange = (event) => {
        console.log(event.target.value)
        setFormState({ doc: event.target.value });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await newSubtopic({
                variables: { ...formState }
            });
            console.log(data);
            // directs back to content creator on submission
            window.location.assign('/contentcreator');

        } catch (e) {
            console.error(e);
        }
    };
    return (
        <>
            <Container sx={{ marginTop: "10em" }}>
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
                    {/* add to a topic */}

                    <Form.Select
                        aria-label="select topic"
                        name="doc"
                        onChange={handleChange}
                        className="bg-dark variant-white text-white"
                    >
                        <option className="variant-white">Add to Topic:</option>
                        {topicData.map((topic) => {
                            return (
                                <>
                                    <option value={topic._id}>{topic.title}</option>
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