import React, { useState } from "react";
import {
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Box,
} from "@mui/material";
import { QUERY_ALL_TOPICS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_TOPIC } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function EditTopicDialog({ topic }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <EditTopic topic={topic} />
        </SnackbarProvider>
    );
}

function EditTopic({ topic }) {

    // useMutation -- and refetch needed to update site content dynamically
    const [updateTopic, { subtopicErr }] = useMutation(UPDATE_TOPIC, {
        refetchQueries: [{ query: QUERY_ALL_TOPICS }]
    });

    const { enqueueSnackbar } = useSnackbar();

    // here formstate defaults to the current data values
    const [formState, setFormState] = useState({
        _id: `${topic._id}`,
        title: `${topic.title}`,
        text: `${topic.text}`,
        image: `${topic.image}`,
        link: `${topic.link}`
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // takes in a card and deck object
    const handleTopicUpdate = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateTopic({
                variables: { ...formState },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`${topic.title} was updated!`, { variant: "success" });

        } catch (err) {
            console.error(err);
            enqueueSnackbar(`Error updating ${topic.title}`, { variant: "error" });
        }
    };

    return (
        <>
            <DialogTitle>{"Update Topic"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "800px", minWidth: "325px" }}>

                <Box
                    component="form"
                    onSubmit={handleTopicUpdate}
                    noValidate
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { sm: "1fr" },
                        gap: 3,
                        marginBottom: "3em",
                        justify: "center",
                        alignItems: "center",
                        overflowY: "scroll"
                    }}
                >
                    <br></br>
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
                        label="Topic Description"
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
                        label="Topic Link"
                        id="link"
                        variant="standard"
                    ></TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{ maxWidth: "100px" }}
                    >
                        Update
                    </Button>
                </Box>
            </DialogContent>
        </>
    );
}
