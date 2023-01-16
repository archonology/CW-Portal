import React from "react";
import Container from 'react-bootstrap/Container';
import ResourceCard from "../components/Resources";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Home = () => {
  return (
    <>
      <Container fluid className="text-center p-5 mt-5 box">
        <h1>Welcome to The Child Welfare Portal</h1>
        <p className="mainText">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
      </Container>

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        style={{ backgroundColor: "#263238", padding: "5rem"}}
      >

        <Box sx={{ flexGrow: 1 }}>
          <Grid container
        spacing={0}>

            <ResourceCard />

          </Grid>
        </Box>
      </Grid>

    </>

  );
};

export default Home;
