import React, { useState } from "react";
import {
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { QUERY_ALL_RESOURCES, QUERY_ONE_RESOURCE } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_RESOURCE } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function EditResourceDialog({ resource }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <Resource resource={resource} />
        </SnackbarProvider>
    );
}

function Resource({ resource }) {
    console.log(resource);
    const [updateResource, { resourceErr }] = useMutation(UPDATE_RESOURCE);
    // const { loading, err, data } = useQuery(QUERY_ONE_RESOURCE);
    // const resource = data?.resource || {};
    // console.log(data);
    const { enqueueSnackbar } = useSnackbar();

    
    // here formstate defaults to the current data values
    const [formState, setFormState] = useState({
        _id: `${resource._id}`,
        title: `${resource.title}`,
        text: `${resource.text}`,
        image: `${resource.image}`,
        link: `${resource.link}`
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };
console.log(resource);
    // takes in a card and deck object
    const handleResourceUpdate = async (event) => {
event.preventDefault();
        try {
            const { data } = await updateResource({
                variables: { ...formState },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`${resource.title} was updated!`, { variant: "success" });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <DialogTitle>{"Update Resource"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "800px", minWidth: "325px" }}>

                    <Box
                        component="form"
                        onSubmit={handleResourceUpdate}
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
                        Update
                    </Button>
                    </Box>
            </DialogContent>
        </>
    );
}
