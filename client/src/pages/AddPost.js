import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../utils/mutations";
import { Container, TextField, Box, Button } from "@mui/material";
import Auth from "../utils/auth";

const AddPost = () => {
  Auth.adminLoggedIn() ? Auth.getAdminToken() : window.location.assign("/");

  const [formState, setFormState] = useState({
    title: "",
    text: "",
    link: "",
  });

  const [newPost, { error, data }] = useMutation(CREATE_POST);

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
      const { data } = await newPost({
        variables: { ...formState },
      });
      // directs back to content creator on submission
      window.location.assign("/contentcreator");
    } catch (e) {
      console.error(e);
      window.alert("Something went wrong! Check the data you entered, please!");
    }
  };
  return (
    <>
      <Container sx={{ marginTop: "2em" }}>
        <h2>Add a New Post</h2>
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
          {/* user sets title, text, url, image */}
          <TextField
            name="title"
            value={formState.title}
            onChange={handleChange}
            // onBlur={() => { handleChange.title.trim() }}
            label="Post Title"
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
            maxRows={30}
            variant="standard"
          ></TextField>

          <TextField
            name="link"
            value={formState.link}
            onChange={handleChange}
            // onBlur={() => { handleChange.link.trim() }}
            label="Post Link"
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
};

export default AddPost;
