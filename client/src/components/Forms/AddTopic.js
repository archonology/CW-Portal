import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TOPIC } from "../../utils/mutations";
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
import { CREATE_TOPIC } from "../../utils/mutations";


const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
        const { data } = await CREATE_TOPIC({
            variables: { ...formState }
        })
    }
}

export const FormTopic = () => {
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
    return (
        <>
            <Container sx={{ marginTop: "10em" }}>
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
                    ></TextField>
                </Box>
            </Container>
        </>
    );
}

export default FormTopic;