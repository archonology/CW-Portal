import React from "react";
import Container from 'react-bootstrap/Container';
import Resources from "../components/Resources";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Image from 'mui-image';
import sample from '../media/DNGF7977.jpeg'


const Home = () => {
  return (
    <>
      <Container fluid className="text-center p-5 mt-5 box">
        <h1 className="welcome">Welcome to The Child Welfare Portal</h1>
        <p className="mainText">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
      </Container>

      <Container fluid className="bg-dark p-1">
        <Stack direction="row" spacing={5} margin={3}>
          <Image src={sample} fit="contain"></Image>
          <p>This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.<br></br><span><Button variant="outlined" color="success" sx={{ marginTop: 3}} size="small">Learn More</Button></span></p>
          <Stack spacing={2} direction="row">
            
          </Stack>
        </Stack>

      </Container>

    </>

  );
};

export default Home;
