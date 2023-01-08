import React from "react";
import Container from 'react-bootstrap/Container';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Home = () => {
    return (
        <>
        <Container  className="text-center p-5 mt-5 box">
        <h1>Welcome to the Public Child Welfare Portal</h1>
        <p className="mainText">This is a site dedicated to child welfare workers in MN. It is a hub for resources commonly needed by new and experience CW workers. Users are also able to create accounts so that they can save favorite resource links and created simple, learning to-do lists.</p>
        </Container>
        
        <Card sx={{ maxWidth: 345, margin: 10, boxShadow: 10 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"https://capacity.childwelfare.gov/sites/default/files/styles/hero_desktop/public/media-image/GettyImages-1084390966-1920px%20-%20mirror.jpg?h=bf8618f3&itok=XH04zm0t"}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Child Welfare Capacity Building Collaborative
        </Typography>
        <Typography variant="body2" color="text.secondary">
        The Center for Tribes collaborates with American Indian and Alaska Native nations to help strengthen Tribal child and family systems and services in order to nurture the safety, permanency, and well-being of children, youth, and families.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Save to a List</Button>
        <Button size="small">Visit the Site</Button>
      </CardActions>
    </Card>

        </>

    );
};

export default Home;
