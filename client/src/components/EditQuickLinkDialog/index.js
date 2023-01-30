import React, { useState } from "react";
import {
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Box,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_QUICKLINK } from "../../utils/mutations";
import { SnackbarProvider, useSnackbar } from "notistack";
import { QUERY_ALL_QUICKLINKS } from "../../utils/queries";

export default function EditQuickLinkDialog({ quicklink }) {

    return (
        // limits the alert to 3 max
        <SnackbarProvider maxSnack={3}>
            <Quick quicklink={quicklink} />
        </SnackbarProvider>
    );
}

function Quick({ quicklink }) {
   
    // useMutation -- and refetch needed to update site content dynamically
    const [updatedQuickLink, { resourceErr }] = useMutation(UPDATE_QUICKLINK, {
        refetchQueries: [{ query: QUERY_ALL_QUICKLINKS }]
    });

    const { enqueueSnackbar } = useSnackbar();

    // here formstate defaults to the current data values
    const [formState, setFormState] = useState({
        _id: `${quicklink._id}`,
        title: `${quicklink.title}`,
        link: `${quicklink.link}`
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // takes in a card and deck object
    const handleQuickLinkUpdate = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updatedQuickLink({
                variables: { ...formState },
            });

            // Display the success message when card added to deck
            enqueueSnackbar(`${quicklink.title} was updated!`, { variant: "success" });

        } catch (err) {
            console.error(err);
            enqueueSnackbar(`Error updating ${quicklink.title}`, { variant: "error" });
        }
    };

    return (
        <>
            <DialogTitle>{"Update Quick Link"}</DialogTitle>
            <DialogContent sx={{ maxHeight: "800px", minWidth: "325px" }}>

                <Box
                    component="form"
                    onSubmit={handleQuickLinkUpdate}
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
